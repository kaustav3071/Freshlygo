import Image from "next/image";
import connectDB from "@/lib/db";
import UserModel from "@/models/user.model";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import EditRoleMobile from "@/components/EditRoleMobile";

async function Home() {

  await connectDB();
  const session = await auth();
  const user = await UserModel.findById(session?.user?.id);
  if (!user)
  {
    return redirect("/login");
  }

  const Incomplete = !user.mobile || !user.role || (!user.mobile && user.role == "user")
  if (Incomplete) {
    return <EditRoleMobile />
  }

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}


export default Home
