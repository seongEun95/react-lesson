import { Outlet } from 'react-router-dom';

export default function NestingPage() {
  return (
    <>
      <h1>Nesting Page</h1>
      <div>
        <Outlet />
      </div>
    </>
  );
}
