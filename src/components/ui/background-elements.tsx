// src/components/ui/background-elements.tsx
import { Trophy, Medal, Award, Star, Crown, Sparkles } from "lucide-react"

export const BackgroundElements = () => {
    return (
        <div className="fixed inset-0 -z-[1] overflow-hidden">
            {/* Main gradient sphere/globe effect */}
            <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-gradient-to-br from-[#4F46E5]/20 via-[#8B5CF6]/20 to-[#EC4899]/20 blur-[120px] opacity-70" />
            
            {/* Secondary gradient blobs */}
            <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[#4F46E5]/15 blur-[100px]" />
            <div className="absolute left-0 bottom-0 h-[500px] w-[500px] rounded-full bg-[#EC4899]/15 blur-[100px]" />
            
            {/* Floating icons with animation */}
            <div className="absolute top-20 left-[15%] text-[#4F46E5]/30 animate-float">
                <Trophy size={48} />
            </div>
            <div className="absolute top-40 right-[20%] text-[#EC4899]/30 animate-float-delayed">
                <Medal size={36} />
            </div>
            <div className="absolute bottom-40 left-[30%] text-[#4F46E5]/30 animate-float">
                <Award size={42} />
            </div>
            <div className="absolute top-60 right-[35%] text-[#EC4899]/30 animate-float-delayed">
                <Star size={32} />
            </div>
            <div className="absolute bottom-60 left-[10%] text-[#4F46E5]/30 animate-float">
                <Crown size={38} />
            </div>
            <div className="absolute bottom-32 right-[15%] text-[#EC4899]/30 animate-float-delayed">
                <Sparkles size={34} />
            </div>

            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8883_1px,transparent_1px),linear-gradient(to_bottom,#8883_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
            
            {/* Particle/dot effects */}
            <div className="absolute inset-0">
                {Array.from({ length: 50 }).map((_, i) => (
                    <div 
                        key={i}
                        className="absolute rounded-full bg-white opacity-[0.15]"
                        style={{
                            width: `${Math.random() * 3 + 1}px`,
                            height: `${Math.random() * 3 + 1}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    />
                ))}
            </div>
            
            {/* Radial gradient overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#44444415,transparent_50%),radial-gradient(ellipse_at_bottom,#44444415,transparent_50%)]" />
        </div>
    )
}