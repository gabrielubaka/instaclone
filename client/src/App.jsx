import AppRoutes from "./routes/AppRoutes";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import { LazySpinner } from "./components/Spinner";
import { useAuth } from "./store";

function App() {
  const {isCheckingAuth} = useAuth();
  if (isCheckingAuth) {
    return <LazySpinner />
  }
  return (
    <HelmetProvider>
      <Toaster  position="top-center" expand={true} richColors/>
      <AppRoutes />
    </HelmetProvider>
  );
}

export default App;
