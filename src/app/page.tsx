import Image from "next/image";
import connectDB from "@/lib/db";
import UserModel from "@/models/user.model";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import EditRoleMobile from "@/components/EditRoleMobile";
import Nav from "@/components/Nav"
import UserDashboard from "@/components/UserDashboard";
import AdminDashboard from "@/components/AdminDashboard";
import DeliveryPartnerDashboard from "@/components/DeliveryPartnerDashboard";

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
  const plainUser = JSON.parse(JSON.stringify(user))
  return (
    <div>
      <Nav user={plainUser}/>
      { plainUser.role == "user" ? <UserDashboard /> : 
      plainUser.role == "admin" ? <AdminDashboard /> : 
      plainUser.role == "deliveryPartner" ? <DeliveryPartnerDashboard /> : null }
    </div>
  );
}


export default Home
