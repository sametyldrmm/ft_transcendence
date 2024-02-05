import toast from "react-hot-toast";
import { ReactNode, useEffect, useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useAuthContext } from "@/auth/AuthContext";
import { updateProfileAPI } from "@/api/web/profile";

Profile.getLayout = (page: ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function Profile() {
  const { get2FAQrCode, user } = useAuthContext();

  const [login, setLogin] = useState(user?.login || "");
  const [file, setFile] = useState("");
  const [qrCode, setQrCode] = useState<string>();
  const [enable2Fa, setEnable2FA] = useState(user?.twoFA);

  const onSubmit = (e: any) => {
    e.preventDefault();

    let json = {login : login,avatar : file, twoFA:String(enable2Fa)};

    updateProfileAPI(json)
    .then(() => toast.success("Success"))
    .catch((e) => toast.error(e.message))
  };

  const handleImageClick = (e : string) => {
    setFile(e);
  }

  useEffect(() => {
    get2FAQrCode().then((data) => setQrCode(data));
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center">
        <div className="items-center h-3/4">
          <div className=" p-10 gap-5 overflow-auto flex flex-col items-center justify-center">
            <div className="avatar online h-2/3">
              <div className="rounded-full">
                <img src={user?.avatar || file} />
              </div>
            </div>
            <div className="font-bold font-serif text-center">{user?.full_name}</div>
          </div>

          <div className="items-center flex justify-center gap-12 border border-black">
            <div className="item-center">
              <h3 className=" mb-2 underline mt-2">Qr Code</h3>
              <img src={qrCode}/>
              <div className="form-control h-1/2">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    className="toggle toggle-success"
                    checked={enable2Fa}
                    onChange={(e) => setEnable2FA(e.target.checked)}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="card items-center">
            <div className="card-body">
              <form onSubmit={onSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Username</span>
                  </label>
                  <input
                    type="text"
                    placeholder={user?.login}
                    name="login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    className="input input-bordered"
                  />
                  <label className="label mt-4">
                    <span className="label-text">Choose Your Own Avatar</span>
                  </label>
                  <label htmlFor="my_modal_6" className="btn">select</label>
                  <input type="checkbox" id="my_modal_6" className="modal-toggle" />
                  <div className="modal fixed top-0 left-0 w-full h-full flex flex-wrap items-center justify-center opacity-0 pointer-events-none">
                    <div className="modal-box bg-white p-4 rounded shadow-md"> 
                      <img src="/ekrem.jpeg" alt="Image 1" className="mb-2" onClick={() => handleImageClick("/ekrem.jpeg")} />
                      <img src="/polat.jpeg" alt="Image 2" className="mb-2" onClick={() => handleImageClick("/polat.jpeg")} />
                      <img src="/cakir.jpeg" alt="Image 3" className="mb-2" onClick={() => handleImageClick("/cakir.jpeg")} />
                      <img src="/ganyotcu.jpeg" alt="Image 4" className="mb-2" onClick={() => handleImageClick("/ganyotcu.jpeg")} />
                      <img src="/huseyin.jpeg" alt="Image 5" className="mb-2" onClick={() => handleImageClick("/huseyin.jpeg")} />
                      <img src="/ozgur.jpeg" alt="Image 6" className="mb-2" onClick={() => handleImageClick("/ozgur.jpeg")} />
                      <img src="/sabri.jpeg" alt="Image 7" className="mb-2" onClick={() => handleImageClick("/sabri.jpeg")} />
                      <img src="/memati.jpeg" alt="Image 8" className="mb-2" onClick={() => handleImageClick("/memati.jpeg")} />
                      <div className="modal-action mt-10">
                        <label htmlFor="my_modal_6" className="btn">Close</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <button className="btn btn-outline btn-success mt-20">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}
