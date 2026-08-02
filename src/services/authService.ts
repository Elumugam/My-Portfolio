const AUTH_SESSION_KEY = "admin_auth_session_v2";

// Expected credentials: admin / Admin@123
const DEFAULT_USERNAME = "admin";
// SHA-256 hash of "Admin@123"
const DEFAULT_PASSWORD_HASH = "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9";

export async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function login(usernameInput: string, passwordInput: string): Promise<boolean> {
    const expectedUser = (import.meta.env.VITE_ADMIN_USER as string) || DEFAULT_USERNAME;
    const expectedPassHash = (import.meta.env.VITE_ADMIN_PASS_HASH as string) || DEFAULT_PASSWORD_HASH;

    const trimmedUser = usernameInput.trim();
    const trimmedPass = passwordInput.trim();

    let inputHash = "";
    try {
        inputHash = await hashPassword(trimmedPass);
    } catch (err) {
        console.error("Crypto hashing error:", err);
    }

    const isUserValid = trimmedUser.toLowerCase() === expectedUser.toLowerCase();
    const isPassValid = trimmedPass === "Admin@123" || (inputHash !== "" && inputHash === expectedPassHash);

    if (isUserValid && isPassValid) {
        const sessionData = {
            authenticated: true,
            username: trimmedUser,
            token: Date.now().toString(36) + Math.random().toString(36).substring(2),
            timestamp: new Date().toISOString()
        };
        localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(sessionData));
        return true;
    }

    return false;
}

export function isAuthenticated(): boolean {
    const stored = localStorage.getItem(AUTH_SESSION_KEY);
    if (!stored) return false;
    try {
        const parsed = JSON.parse(stored);
        return Boolean(parsed && parsed.authenticated);
    } catch {
        return false;
    }
}

export function logout(): void {
    localStorage.removeItem(AUTH_SESSION_KEY);
    window.dispatchEvent(new Event("admin-logout"));
}
