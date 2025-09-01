export function AnimatedLogo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="animate-fade-in-up">
        <div className="relative">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center animate-pulse">
            <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-bounce"></div>
        </div>
      </div>
      <span className="text-xl font-bold text-foreground animate-fade-in-up animation-delay-300">
        Fresh Bakery
      </span>
    </div>
  )
}
