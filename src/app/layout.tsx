import type { Metadata } from "next";

// These styles apply to every route in the application
import "./globals.css";
import { DrawerProvider } from "./contexts/DrawerProvider";
import { AxiosProvider } from "./contexts/AxiosProvider";
import { MessageProvider } from "./contexts/MessageProvider";
import { LoadingProvider } from "./contexts/LoadingProvider";
import { ModalProvider } from "./contexts/ModalProvider";
import { NamespaceProvider } from "./contexts/NamespaceProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="jp">
      <body>
        <LoadingProvider>
          <MessageProvider>
            <DrawerProvider>
              <ModalProvider>
                <AxiosProvider>
                  <NamespaceProvider>{children}</NamespaceProvider>
                </AxiosProvider>
              </ModalProvider>
            </DrawerProvider>
          </MessageProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
