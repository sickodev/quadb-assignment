"use client";
import { UserIcon } from "@heroicons/react/24/solid";
import { setName, setAge } from "@/features/user/userSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const dialogId = "user_modal";
const myModal = document.getElementById(dialogId) as HTMLDialogElement;

const Navbar = () => {
    const router = useRouter();
    const handleClick = () => {
        if (userName === " ") alert("Invalid Input");

        localStorage.setItem("name", userName);
        router.refresh();
        myModal.close();
    };

    const [userName, setUserName] = useState<string>("");
    return (
        <div className='p-2 text-primary-content bg-neutral-focus'>
            <div className='mx-4 my-2 flex items-center justify-between'>
                <Link href={"/"}>
                    <h3 className='text-xl'>Save Me a Seat</h3>
                </Link>
                <button
                    onClick={() => myModal.showModal()}
                    className='border-2 rounded-full transition active:scale-95 hover:scale-105 p-1 shadow-sm shadow-white bg-gradient-to-b from-accent to-warning-content'
                >
                    <UserIcon className='h-6 w-6 text-warning' />
                </button>
                <dialog id='user_modal' className='modal modal-middle'>
                    <form method='dialog' className='modal-box'>
                        <h3 className='text-2xl font-bold py-3'>
                            User Information
                        </h3>
                        <div className='py-2 flex flex-col'>
                            <label className='font-bold text-lg mx-4 py-2'>
                                Name :
                            </label>
                            <input
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                                type='text'
                                className='mx-2 p-2 border-none outline-none rounded-lg'
                            />
                        </div>
                        <div className='mt-3 modal-action'>
                            <button
                                onClick={handleClick}
                                type='button'
                                className='btn btn-outline btn-success'
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </dialog>
            </div>
        </div>
    );
};

export default Navbar;
