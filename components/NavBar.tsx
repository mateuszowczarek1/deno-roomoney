import { isLogged } from "@/signals/isLogged.tsx";
import { asset } from "$fresh/runtime.ts";
import Anchor from "@/components/Common/Anchor.tsx";

function NavBar() {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand navbar-logo" href="/">
            <img
              src={asset("/images/roomoney_logo.webp")}
              alt="Roomoney App Logo"
              id="navbar-logo"
            />Roomoney 💵
          </a>
          <div>
            <ul class="navbar-nav me-auto">
              {isLogged.value === true
                ? (
                  <>
                    <li class="nav-item">
                      <Anchor
                        class="nav-link"
                        link="/dashboard"
                        name="Dashboard"
                      />
                    </li>
                    <li class="nav-item">
                      <Anchor class="nav-link" link="/logout" name="Logout" />
                    </li>
                  </>
                )
                : (
                  <>
                    <li class="nav-item">
                      <Anchor class="nav-link" link="/login" name="Login in" />
                    </li>
                    <li class="nav-item">
                      <Anchor
                        class="nav-link"
                        link="/register"
                        name="Sign up"
                      />
                    </li>
                  </>
                )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
