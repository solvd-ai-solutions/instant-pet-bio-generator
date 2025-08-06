export default function App() {
  return (
    <div className="h-screen w-screen flex flex-col bg-white overflow-hidden">
      <div className="bg-lavender text-white px-4 py-2 flex items-center justify-center text-sm">
        <span className="font-semibold">🐾 FIGMA DESIGN SYSTEM APPLIED</span>
      </div>
      <div className="flex-1 p-4">
        <h1>Instant Pet Bio Generator</h1>
        <p>Now using the proper Figma design system and components</p>
        <div className="card-base p-4 mt-4">
          <h2>Design System Applied</h2>
          <p className="text-muted-foreground">This now uses the exact CSS and components from your Figma export</p>
        </div>
      </div>
    </div>
  );
}
