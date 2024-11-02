import { AuthProvider } from '../app/context/AuthContext';
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <html lang="en">
                <body>{children}</body>
            </html>
        </AuthProvider>
    );
}
