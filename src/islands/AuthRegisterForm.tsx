import { register } from "@/lib/api";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function AuthRegisterForm(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const result = await register({name, email, password});
            console.log("Registered:", result);
            
            alert("Registration successful (demo)");
            
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Create account</CardTitle>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                    </div>

                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                    </div>

                    {error && (
                        <p className="text-sm text-red-500">{error}</p>
                    )}
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Creating account..." : "Register"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}