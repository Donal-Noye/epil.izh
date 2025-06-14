import { Hero } from "@/features/landing/hero";
import { Header } from "@/features/landing/header";
import { About } from "@/features/landing/about";
import { Specialists } from "@/features/landing/specialists";
import { Services } from "@/features/landing/services";
import { Footer } from "@/features/landing/footer";
import { ToggleTheme } from "@/features/theme/toggle-theme";

export function LandingPage() {
	return (
		<>
      <Header />
      <Hero />
      <About />
      <Specialists />
      <Services />
      <Footer />
      <ToggleTheme className="fixed bottom-3 left-3" />
		</>
	)
}