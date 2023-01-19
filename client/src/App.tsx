import React from "react";
import { Routes, Route } from "react-router-dom";

import { StartGame } from "./pages/StartGame";
import { Tracker } from "./pages/Tracker";
import { Play } from "./pages/Play";

export const App = () => {
    return (
        <Routes>
            <Route path={"/"} element={<StartGame />} />
            <Route path={":gameId/play"} element={<Play />} />
            <Route path={":gameId/tracker"} element={<Tracker />} />
            <Route path={":gameId/admin"} element={<>admin</>} />
        </Routes>
    );
};
