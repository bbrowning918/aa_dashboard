import React from "react";
import { Routes, Route } from "react-router-dom";

import { NewGame } from "./pages/NewGame";
import { Tracker } from "./pages/Tracker";
import { Play } from "./pages/Play";

export const App = () => {
    return (
        <Routes>
            <Route path={"/"} element={<NewGame />} />
            <Route path={":gameId/play"} element={<Play />} />
            <Route path={":gameId/tracker"} element={<Tracker />} />
        </Routes>
    );
};
