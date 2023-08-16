import { Outlet } from 'react-router-dom';

export default function NestingPage() {
  return (
    <>
      <div>NestingPage-parents</div>
      <div>Header</div>
      <Outlet />
    </>
  );
}
