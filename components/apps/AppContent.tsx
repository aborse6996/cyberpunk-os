import { ComponentType } from "react";

import TerminalApp from "./Terminal/TerminalApp";
import BrowserApp from "./Browser/BrowserApp";
import FileManagerApp from "./FileManager/FileManagerApp";

const appComponents: Record<string, ComponentType> = {
  terminal: TerminalApp,
  browser: BrowserApp,
  fileManager: FileManagerApp,
};

type AppContentProps = {
  appId: string;
};

const AppContent = ({appId}: AppContentProps) => {
    const AppComponent = appComponents[appId];

    if(!AppComponent) {
        return(
            <div className="p-5 font-mono text-sm text-rose-300">
                Application UI unavailable: {appId}
            </div>
        )
    }

    return <AppComponent />
}

export default AppContent