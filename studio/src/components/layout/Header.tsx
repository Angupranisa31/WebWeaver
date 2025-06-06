
export function Header() {
  return (
    <header className="py-6 px-4 md:px-8 border-b border-border">
      <div className="container mx-auto flex items-center gap-3">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="WebWeaver logo">
          <path d="M2 10L8 22L14 10L20 22L26 10" stroke="#003366" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 10L12 22L18 10L24 22L30 10" stroke="#FF6600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h1 className="text-3xl font-headline font-bold text-primary">
          WebWeaver
        </h1>
      </div>
    </header>
  );
}
