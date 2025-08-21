import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

function RightSection() {
  return (
    <aside className="w-[25%] h-screen hidden lg:block sticky top-0">
      <div className="h-[100px] border-b-[1px] border-border">
        <div className="w-full h-full flex justify-center items-center">
          <h1 className="text-3xl text-center">Trending Section</h1>
        </div>
      </div>
      <div className="p-5">
        <Alert variant="default">
          <Terminal />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            <p>
              This project was built by{" "}
              <a
                href="https://piyushpardeshi.space"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                @piyush
              </a>{" "}
              as part of the Integral engineering assignment. You can check out
              the complete code at{" "}
              <a
                href="https://github.com/PiyushPb/whisper-microfeed"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://github.com/PiyushPb/whisper-microfeed
              </a>
              .
            </p>
          </AlertDescription>
        </Alert>
      </div>
    </aside>
  );
}

export default RightSection;
