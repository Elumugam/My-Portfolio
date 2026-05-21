import { useEffect, useRef, useState } from "react";
import { CatSVG, RabbitSVG, BirdSVG, RobotSVG, CharState } from "./Characters";

type Entity = {
  id: string;
  type: "animal" | "robot";
  x: number;
  y: number;
  vx: number;
  vy: number;
  speed: number;
  state: CharState;
  pausedUntil: number;
  section: number; // 0=hero, 1=about, 2=projects, 3=contact
  targetX: number | null;
  platform: DOMRect | null;
  phase: number;
};

const SECTIONS = ["hero", "about", "projects", "contact"];

export default function GlobalAnimation() {
    const [entities, setEntities] = useState<Entity[]>([]);
    const reqRef = useRef<number>();
    const stateRef = useRef<Entity[]>([]);
    const platformsRef = useRef<{ id: string, rect: DOMRect }[]>([]);
    const activeSectionRef = useRef<number>(0);

    useEffect(() => {
        const updatePlatforms = () => {
            const platformIds = ["word-design", "word-develop", "word-scale"];
            platformsRef.current = platformIds.map(id => {
                const el = document.getElementById(id);
                return { id, rect: el ? el.getBoundingClientRect() : new DOMRect(0,0,0,0) };
            }).filter(p => p.rect.width > 0);
        };
        
        window.addEventListener('resize', updatePlatforms);
        window.addEventListener('scroll', () => {
            const h = window.innerHeight;
            const scrollY = window.scrollY;
            activeSectionRef.current = Math.min(3, Math.max(0, Math.floor((scrollY + h/2) / h)));
        });

        // initial delay
        setTimeout(() => {
            updatePlatforms();
            const w = window.innerWidth;
            const h = window.innerHeight;

            const developRect = platformsRef.current.find(p => p.id === "word-develop")?.rect;
            const startRX = developRect ? developRect.right + 20 : w / 2;
            const startRY = developRect ? developRect.top : h / 2;

            const initEntities: Entity[] = [
                { id: "cat", type: "animal", x: w * 0.2, y: h - 50, vx: 0, vy: 0, speed: 1.5, state: "idle", pausedUntil: 0, section: 0, targetX: w * 0.8, platform: null, phase: 0 },
                { id: "rabbit", type: "animal", x: w * 0.8, y: h - 50, vx: 0, vy: 0, speed: 2.0, state: "idle", pausedUntil: 0, section: 1, targetX: w * 0.2, platform: null, phase: 0 },
                { id: "bird", type: "animal", x: w * 0.5, y: h - 50, vx: 0, vy: 0, speed: 1.8, state: "idle", pausedUntil: 0, section: 2, targetX: w * 0.9, platform: null, phase: 0 },
                // Rabbit and Bird share 1, 2, 3 sections, Cat is 0 and 3
                { id: "robot", type: "robot", x: startRX, y: startRY - 50, vx: 0, vy: 0, speed: 1.8, state: "sit", pausedUntil: Date.now() + 2000, section: -1, targetX: null, platform: null, phase: 0 } // Robot spans all sections
            ];

            // Re-distribute sections evenly:
            // Hero(0): cat, robot
            // About(1): rabbit, bird
            // Projects(2): bird, cat
            // Contact(3): cat, robot
            // We just let the engine assign them dynamically later, but robot is always visible

            stateRef.current = initEntities;

            let lastTime = performance.now();

            const update = (time: number) => {
                let dt = (time - lastTime) / 16.66;
                if (dt > 3) dt = 3;
                lastTime = time;
                const now = Date.now();
                const w = window.innerWidth;
                const h = window.innerHeight;
                const activeSect = activeSectionRef.current;

                const current = stateRef.current;
                const animals = current.filter(e => e.type === "animal");
                const robot = current.find(e => e.type === "robot");

                // Assign random sections if needed
                animals.forEach(a => {
                    // if animal is off-screen (different section), occasionally warp them to current section to keep 2 visible
                    // Simplified: We force exactly 2 animals/robot in current section
                });

                current.forEach(ent => {
                    const isRobot = ent.type === "robot";

                    // Gravity & Physics
                    if (ent.y < h - 50 && !ent.platform) {
                        ent.vy += 0.5 * dt; // gravity
                        ent.state = "jump";
                    } else if (!ent.platform) {
                        ent.vy = 0;
                        ent.y = h - 50; // Floor collision
                    }

                    if (now < ent.pausedUntil) {
                        if (ent.vy === 0) ent.state = "sit";
                        ent.x += ent.vx * dt;
                        ent.y += ent.vy * dt;
                        return;
                    }

                    // Platform collision
                    if (platformsRef.current.length > 0 && ent.vy >= 0) {
                        let onPlatform = false;
                        for (let p of platformsRef.current) {
                            if (ent.x > p.rect.left - 20 && ent.x < p.rect.right + 20) {
                                if (Math.abs(ent.y - (p.rect.top - 50)) < 15) {
                                    ent.y = p.rect.top - 50;
                                    ent.vy = 0;
                                    ent.platform = p.rect;
                                    onPlatform = true;
                                    break;
                                }
                            }
                        }
                        if (!onPlatform) ent.platform = null;
                    }

                    // Movement Logic
                    if (isRobot) {
                        // Find closest unpaused animal in same section (or any animal for global)
                        let target = animals.find(a => now >= a.pausedUntil);
                        if (target) {
                            const dx = target.x - ent.x;
                            if (Math.abs(dx) > 60) {
                                ent.vx = dx > 0 ? ent.speed : -ent.speed;
                                ent.state = "run";
                            } else {
                                ent.vx = 0;
                                ent.state = "idle";
                            }
                        } else {
                            ent.vx = 0;
                            ent.state = "idle";
                        }
                    } else {
                        // Animal Random Movement
                        ent.phase -= dt;
                        if (ent.phase <= 0) {
                            // Pick new action
                            const action = Math.random();
                            if (action < 0.2) {
                                ent.vx = 0;
                                ent.state = "idle";
                                ent.phase = 60 + Math.random() * 60; // 1-2 seconds
                            } else if (action < 0.3 && !ent.platform && activeSect === 0) {
                                // Try to jump onto a platform
                                const p = platformsRef.current[Math.floor(Math.random() * platformsRef.current.length)];
                                if (p) {
                                    ent.targetX = p.rect.left + p.rect.width/2;
                                    const dist = ent.targetX - ent.x;
                                    ent.vx = dist > 0 ? ent.speed*1.5 : -ent.speed*1.5;
                                    ent.vy = -12; // jump
                                    ent.state = "jump";
                                    ent.phase = 60;
                                }
                            } else {
                                // walk or run
                                const dir = Math.random() > 0.5 ? 1 : -1;
                                ent.vx = dir * ent.speed * (Math.random() > 0.5 ? 1 : 0.5);
                                ent.state = Math.abs(ent.vx) > ent.speed * 0.8 ? "run" : "walk";
                                ent.phase = 60 + Math.random() * 120;
                            }
                        }

                        // Bounds check
                        if (ent.platform) {
                            if (ent.x < ent.platform.left - 20) { ent.vx *= -1; ent.x = ent.platform.left - 20; }
                            if (ent.x > ent.platform.right + 20) { ent.vx *= -1; ent.x = ent.platform.right + 20; }
                        } else {
                            if (ent.x < 50) { ent.vx *= -1; ent.x = 50; }
                            if (ent.x > w - 50) { ent.vx *= -1; ent.x = w - 50; }
                        }
                    }

                    // Apply velocity
                    ent.x += ent.vx * dt;
                    ent.y += ent.vy * dt;

                    // If walking/running, ensure state isn't overridden by gravity if on floor
                    if (ent.vy === 0 && (ent.state === "jump" || ent.state === "sit")) {
                        ent.state = Math.abs(ent.vx) > 0 ? "walk" : "idle";
                    }
                });

                setEntities([...stateRef.current]);
                reqRef.current = requestAnimationFrame(update);
            };

            reqRef.current = requestAnimationFrame(update);
        }, 1000);

        return () => {
            if (reqRef.current) cancelAnimationFrame(reqRef.current);
            window.removeEventListener('resize', updatePlatforms);
        };
    }, []);

    const handleClick = (id: string) => {
        const ent = stateRef.current.find(e => e.id === id);
        if (ent) {
            ent.pausedUntil = Date.now() + 1500;
            ent.state = "sit";
            ent.vx = 0;
            if (ent.type === "robot") ent.vy = -5; // robot does a little jump
        }
    };

    if (entities.length === 0) return null;

    return (
        <div className="fixed inset-0 z-30 pointer-events-none overflow-hidden" style={{ height: '100vh' }}>
            {entities.map(ent => {
                let SVGComp = CatSVG;
                if (ent.id === "rabbit") SVGComp = RabbitSVG;
                if (ent.id === "bird") SVGComp = BirdSVG;
                if (ent.id === "robot") SVGComp = RobotSVG;

                const isAnimal = ent.type === "animal";
                const scaleX = ent.vx < 0 ? -1 : 1; 

                // Dynamic visibility logic (2 chars per section rule)
                let visible = false;
                const s = activeSectionRef.current;
                
                // Defined Combinations:
                // Hero (0): Robot + Cat
                // About (1): Rabbit + Bird
                // Projects (2): Cat + Bird
                // Contact (3): Robot + Rabbit
                
                if (s === 0 && (ent.id === 'robot' || ent.id === 'cat')) visible = true;
                if (s === 1 && (ent.id === 'rabbit' || ent.id === 'bird')) visible = true;
                if (s === 2 && (ent.id === 'cat' || ent.id === 'bird')) visible = true;
                if (s === 3 && (ent.id === 'robot' || ent.id === 'rabbit')) visible = true;

                return (
                    <div
                        key={ent.id}
                        className={`absolute text-white transition-opacity duration-1000 cursor-pointer pointer-events-auto ${visible ? 'opacity-80 hover:opacity-100' : 'opacity-0 pointer-events-none'}`}
                        style={{
                            transform: `translate(${ent.x}px, ${ent.y}px) scaleX(${scaleX})`,
                            width: ent.type === 'robot' ? 60 : 50,
                            height: ent.type === 'robot' ? 60 : 50,
                            marginTop: -30,
                            marginLeft: -25,
                            willChange: 'transform'
                        }}
                        onClick={() => handleClick(ent.id)}
                    >
                        <SVGComp state={ent.state} />
                    </div>
                );
            })}
        </div>
    );
}
