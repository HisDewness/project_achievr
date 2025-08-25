import { Button } from "@/components/ui/button"
import { Gamepad2 } from "lucide-react"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-4 flex items-center gap-2">
        <Gamepad2 className="w-8 h-8 text-indigo-600" />
        Project Achievr
      </h1>
      <p className="text-gray-600 mb-6">
        Track your achievements and unlock guides for 100% completion.
      </p>
      <Button>
        Get Started
      </Button>
    </main>
  )
}
