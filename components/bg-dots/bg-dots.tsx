'use client'

export function BackgroundDots({ children }: { children: React.ReactNode }) {
  return (
    <div 
      className="relative flex-1 p-4 xl:px-8"
      style={{
        backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.2) 0.5px, transparent 0.5px)`,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0'
      }}
    >
      {children}
    </div>
  );
}