interface LoginResponse {
    jwt: string;
    user: {
        id: number;
        email: string;
        // ... andre bruger felter
    }
}

export async function login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch('https://dinmaegler.onrender.com/auth/local', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            identifier: 'mikkel@mail.dk',
            password: '123456',
        }),
    });

    if (!response.ok) {
        throw new Error('Login fejlede');
    }

    return response.json();
} 