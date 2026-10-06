import { emailSchema } from "@chatflare/schemas";
import { createFileRoute } from "@tanstack/react-router";
import {
	ArrowRight,
	Check,
	MessageSquareText,
	Moon,
	ShieldCheck,
	Sparkles,
	Sun,
} from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/sign-in")({
	head: () => ({
		meta: [
			{
				title: "Sign in · ChatFlare",
			},
			{
				name: "description",
				content: "Sign in to your ChatFlare workspace.",
			},
		],
	}),
	component: SignInPage,
});

function SignInPage() {
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState<string | null>(null);
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		setIsDark(document.documentElement.classList.contains("dark"));
	}, []);

	function toggleTheme() {
		const nextTheme = !isDark;
		setIsDark(nextTheme);
		document.documentElement.classList.toggle("dark", nextTheme);
		document.documentElement.style.colorScheme = nextTheme ? "dark" : "light";
		localStorage.setItem("chatflare-theme", nextTheme ? "dark" : "light");
	}

	function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const result = emailSchema.safeParse(email);

		if (!result.success) {
			setEmailError(
				result.error.issues[0]?.message ?? "Enter a valid email address",
			);
			return;
		}

		setEmailError(null);
	}

	return (
		<main className="grid min-h-svh bg-background lg:grid-cols-[minmax(0,1.05fr)_minmax(520px,0.95fr)]">
			<section className="relative hidden overflow-hidden bg-[#0c1712] text-white lg:flex lg:flex-col lg:justify-between lg:p-10 xl:p-14">
				<div className="auth-grid pointer-events-none absolute inset-0 opacity-80" />
				<div className="pointer-events-none absolute -top-28 -left-24 size-[32rem] rounded-full bg-emerald-400/15 blur-3xl" />
				<div className="pointer-events-none absolute right-[-12rem] bottom-[-14rem] size-[38rem] rounded-full bg-cyan-300/10 blur-3xl" />

				<BrandMark className="relative z-10 text-white" />

				<div className="relative z-10 max-w-xl pb-8 xl:pb-12">
					<div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/75 backdrop-blur-sm">
						<Sparkles className="size-3.5 text-emerald-300" />
						Your thinking partner, always within reach
					</div>
					<h1 className="max-w-lg text-balance text-5xl leading-[1.06] font-semibold tracking-[-0.04em] xl:text-6xl">
						Turn scattered thoughts into clear momentum.
					</h1>
					<p className="mt-6 max-w-lg text-lg leading-8 text-white/60">
						Explore ideas, solve hard problems, and move your best work forward
						with an AI workspace designed to stay out of your way.
					</p>
				</div>

				<div className="relative z-10 flex items-center gap-6 text-sm text-white/55">
					<span className="inline-flex items-center gap-2">
						<ShieldCheck className="size-4 text-emerald-300" />
						Private by design
					</span>
					<span className="inline-flex items-center gap-2">
						<Check className="size-4 text-emerald-300" />
						No password required
					</span>
				</div>
			</section>

			<section className="relative flex min-h-svh flex-col px-5 py-5 sm:px-8 sm:py-7 lg:px-12 xl:px-20">
				<header className="flex items-center justify-between">
					<BrandMark className="lg:hidden" />
					<div className="hidden lg:block" />
					<Button
						variant="ghost"
						size="icon"
						type="button"
						onClick={toggleTheme}
						aria-label={isDark ? "Use light theme" : "Use dark theme"}
						className="rounded-full text-muted-foreground"
					>
						{isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
					</Button>
				</header>

				<div className="flex flex-1 items-center justify-center py-10 sm:py-14">
					<Card className="w-full max-w-[420px] gap-0 border-0 bg-transparent py-0 shadow-none ring-0">
						<CardHeader className="px-0 text-center sm:text-left">
							<div className="mx-auto mb-5 flex size-11 items-center justify-center rounded-2xl bg-foreground text-background shadow-sm sm:mx-0">
								<MessageSquareText className="size-5" strokeWidth={1.8} />
							</div>
							<CardTitle className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
								Welcome to ChatFlare
							</CardTitle>
							<CardDescription className="mt-2 text-base leading-6">
								Sign in or create an account to continue.
							</CardDescription>
						</CardHeader>

						<CardContent className="mt-8 px-0">
							<Button
								variant="outline"
								size="lg"
								type="button"
								className="h-11 w-full rounded-xl bg-card text-[0.925rem] shadow-xs"
							>
								<GoogleMark />
								Continue with Google
							</Button>

							<div className="my-6 flex items-center gap-3">
								<Separator className="flex-1" aria-hidden="true" />
								<span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
									or
								</span>
								<Separator className="flex-1" aria-hidden="true" />
							</div>

							<form
								className="space-y-4"
								onSubmit={handleEmailSubmit}
								noValidate
							>
								<div className="space-y-2">
									<Label htmlFor="email">Email address</Label>
									<Input
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										autoCapitalize="none"
										spellCheck={false}
										placeholder="you@example.com"
										value={email}
										onChange={(event) => {
											setEmail(event.target.value);
											if (emailError) setEmailError(null);
										}}
										aria-invalid={Boolean(emailError)}
										aria-describedby={emailError ? "email-error" : undefined}
										className="h-11 rounded-xl bg-card px-3.5"
									/>
									<div className="min-h-5" aria-live="polite">
										{emailError ? (
											<p id="email-error" className="text-sm text-destructive">
												{emailError}
											</p>
										) : null}
									</div>
								</div>

								<Button
									size="lg"
									type="submit"
									className="h-11 w-full rounded-xl text-[0.925rem]"
								>
									Continue with email
									<ArrowRight className="size-4 transition-transform group-hover/button:translate-x-0.5" />
								</Button>
							</form>

							<p className="mt-7 text-center text-xs leading-5 text-muted-foreground">
								By continuing, you agree to our{" "}
								<a
									href="/terms"
									className="font-medium text-foreground underline-offset-4 hover:underline"
								>
									Terms
								</a>{" "}
								and{" "}
								<a
									href="/privacy"
									className="font-medium text-foreground underline-offset-4 hover:underline"
								>
									Privacy Policy
								</a>
								.
							</p>
						</CardContent>
					</Card>
				</div>

				<footer className="text-center text-xs text-muted-foreground">
					© {new Date().getFullYear()} ChatFlare
				</footer>
			</section>
		</main>
	);
}

function BrandMark({ className = "" }: { className?: string }) {
	return (
		<div className={`flex items-center gap-2.5 ${className}`}>
			<span className="flex size-8 items-center justify-center rounded-xl bg-emerald-400 text-[#0c1712] shadow-[0_8px_30px_rgb(52_211_153/0.2)]">
				<Sparkles className="size-4" strokeWidth={2.2} />
			</span>
			<span className="text-[1.05rem] font-semibold tracking-[-0.025em]">
				ChatFlare
			</span>
		</div>
	);
}

function GoogleMark() {
	return (
		<svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
			<path
				fill="#4285F4"
				d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.92h5.38a4.6 4.6 0 0 1-2 3.02v2.54h3.24c1.9-1.75 2.98-4.33 2.98-7.41Z"
			/>
			<path
				fill="#34A853"
				d="M12 22c2.7 0 4.97-.9 6.62-2.43l-3.24-2.54c-.9.6-2.05.96-3.38.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.62A10 10 0 0 0 12 22Z"
			/>
			<path
				fill="#FBBC05"
				d="M6.39 13.86A6.01 6.01 0 0 1 6.08 12c0-.65.11-1.28.31-1.86V7.52H3.04A10 10 0 0 0 2 12c0 1.61.39 3.14 1.04 4.48l3.35-2.62Z"
			/>
			<path
				fill="#EA4335"
				d="M12 6.01c1.47 0 2.79.51 3.83 1.5l2.87-2.88A9.65 9.65 0 0 0 12 2a10 10 0 0 0-8.96 5.52l3.35 2.62C7.18 7.77 9.39 6.01 12 6.01Z"
			/>
		</svg>
	);
}
