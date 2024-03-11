import { Route, Routes, Navigate } from "react-router-dom";
import { Client } from "./pages/Client";
import { CreateClient } from "./pages/Client/CreateClient";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { ImprovedRoute } from "./pages/ImprovedRoute";

export function Router() {
  return (
    <Routes>
      {/* Redirecionamento da rota raiz para /client */}
      <Route path="/" element={<Navigate to="/client" replace />} />

      {/* Rota para /client e /improved-route com layout padrão */}
      <Route path="/client/*" element={<DefaultLayout />}>
        {/* Rota padrão /client mostra o componente Client */}
        <Route index element={<Client />} />

        {/* Rota para /client/create mostra o componente CreateClient */}
        <Route path="create" element={<CreateClient />} />
      </Route>
      <Route path="/improved-route/*" element={<DefaultLayout />}>
        {/* Rota para /improved-route mostra o componente ImprovedRoute */}
        <Route index element={<ImprovedRoute />} />
      </Route>

      {/* Redirecionamento para /client se nenhuma rota for encontrada */}
      <Route path="*" element={<Navigate to="/client" replace />} />
    </Routes>
  );
}
