export function getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const cookiesArray = document.cookie.split(';');
    
    for (let i = 0; i < cookiesArray.length; i++) {
        let cookie = cookiesArray[i];
        while (cookie.charAt(0) === ' ') cookie = cookie.substring(1, cookie.length); // Trim leading spaces
        if (cookie.indexOf(nameEQ) === 0) return cookie.substring(nameEQ.length, cookie.length);
    }

    return null; // Return null if the cookie is not found
}
