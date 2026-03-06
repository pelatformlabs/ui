import { Suspense } from "react";

import { Spinner } from "@pelatform/ui/radix";

export default function Page() {
  return (
    <div className="h-full w-full">
      <div className="border-b bg-background py-8 lg:py-12">
        <div className="container">
          <h1 className="font-bold text-2xl sm:text-3xl">
            <span className="tracking-tight">
              {" "}
              Beautiful <span className="text-primary">Icons Collection</span>
            </span>
          </h1>
          <p className="mt-1.5 text-muted-foreground text-sm lg:text-base">
            <span>Discover our premium collection of icons that are fully customizable,</span>
            <br className="max-sm:hidden" />
            <span>responsive, and optimized for modern web applications.</span>
          </p>
        </div>
      </div>
      <div className="container max-md:p-0">
        <div className="overflow-hidden bg-background px-6 py-5 shadow-foreground/10 sm:border-x md:px-12 md:py-10">
          <Suspense
            fallback={
              <div className="flex min-h-96 items-center justify-center">
                <Spinner />
              </div>
            }
          >
            {/* <ClientPage /> */}
            <div>Client Page</div>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
