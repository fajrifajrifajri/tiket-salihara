import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import { Link } from "@inertiajs/react";

export default function Component() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log("Login attempted with:", formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-sm mb-8">
                <Logo isScrolled={false} className="w-[180px] h-[99px]" />
            </div>

            <Card className="w-full max-w-sm border-none shadow-none">
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            type="text"
                            name="username"
                            placeholder="USER"
                            value={formData.username}
                            onChange={handleChange}
                            className="border-black text-center"
                        />

                        <Input
                            type="password"
                            name="password"
                            placeholder="PASSWORD"
                            value={formData.password}
                            onChange={handleChange}
                            className="border-black text-center"
                        />

                        <Link className="block" href="/dasbor/acara/">
                            <Button
                                type="submit"
                                className="w-full bg-black text-white hover:bg-black/90"
                            >
                                MASUK
                            </Button>
                        </Link>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
