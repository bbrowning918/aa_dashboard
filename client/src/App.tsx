import React from "react";
import { Routes, Route } from "react-router-dom";

import { JoinGame } from "./pages/JoinGame";
import { NewGame } from "./pages/NewGame";
import { Draft } from "./pages/Draft";
import { Tracker } from "./pages/Tracker";

export const App = () => {
    return (
        <Routes>
            <Route path={"/"} element={<NewGame />} />
            <Route path={":gameId/join"} element={<JoinGame />} />
            <Route path={":gameId/draft"} element={<Draft />} />
            <Route path={":gameId/tracker"} element={<Tracker />} />
        </Routes>
    );
};
