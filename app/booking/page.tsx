"use client";
import { StarIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Booking = () => {
    const movie = useSelector((state: any) => state.movie);
    const url = movie.image;
    const router = useRouter();
    const [tickets, setTickets] = useState("1");

    const handleClick = () => {
        window.input_modal.close();
        alert(
            `${localStorage.getItem(
                "name"
            )} your ${tickets} tickets are booked.`
        );
    };

    useEffect(() => {
        if (movie.title === "") {
            router.push("/");
        }
    }, [movie.title, router]);

    return (
        <div
            className={`bg-fixed bg-cover opacity-95 object-contain h-screen w-screen text-secondary-content`}
            style={{
                backgroundImage: `url(${url})`,
                background: "cover",
            }}
        >
            <div className='absolute top-16 left-0 p-4 z-20'>
                <div className='flex items-end space-x-3'>
                    <h1 className='text-primary-content border-l-[6px] font-bold border-warning text-4xl md:text-6xl px-2'>
                        {movie.title}
                    </h1>
                </div>
                <div className='font-light my-2 px-4 flex items-center space-x-4 md:space-x-16'>
                    <p className='text-sm md:text-lg badge badge-accent'>
                        {movie.genre}
                    </p>
                    <p className='text-sm md:text-lg'>
                        {movie.runtime || 120} min
                    </p>
                    <p className='text-sm md:text-lg flex items-center'>
                        <StarIcon className='h-5 w-5 text-warning' />{" "}
                        <span className='px-2'>{movie.rating}</span>
                    </p>
                </div>
                <div className='mt-2 px-3'>
                    <h3 className='text-2xl md:text-4xl mb-2 underline underline-offset-2 decoration-[1.5px]'>
                        Synopsis
                    </h3>
                    <div className='text-justify font-light md:text-lg px-2'>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: movie.summary,
                            }}
                        />
                    </div>
                </div>
                <div className='flex justify-between md:justify-end m-4'>
                    {/* Dialog */}
                    <button
                        onClick={() => window.input_modal.showModal()}
                        className='btn w-full md:w-64 transition md:hover:bg-warning btn-outline btn-warning'
                    >
                        Book Now
                    </button>
                    <dialog id='input_modal' className='modal modal-middle'>
                        <form method='dialog' className='modal-box'>
                            <button
                                htmlFor='input_modal'
                                className='btn btn-sm btn-circle btn-outline btn-error absolute right-2 top-2'
                            >
                                ✕
                            </button>
                            <h3 className='font-bold text-2xl'>Book Seats</h3>
                            <div className='py-3 font-light'>
                                <h4 className='text-lg'>
                                    Movie :{" "}
                                    <span className='font-bold text-xl'>
                                        {movie.title}
                                    </span>
                                </h4>
                                <h5>
                                    Runtime :{" "}
                                    <span className='font-bold text-xl'>
                                        {movie.runtime} min
                                    </span>
                                </h5>
                                <hr className='my-2 -mx-6 border-t-[1px] border-warning/60' />
                            </div>
                            <div className='pt-1 font-light'>
                                <h4 className='text-lg'>
                                    Name :{" "}
                                    <span className='font-bold text-xl'>
                                        {localStorage.getItem("name")}
                                    </span>
                                </h4>

                                <div className='mt-2'>
                                    <label htmlFor='' className='text-lg'>
                                        Seats :{" "}
                                    </label>
                                    <select
                                        onChange={(e) => {
                                            setTickets(e.target.value);
                                        }}
                                        className='select select-bordered select-sm max-w-xs mr-4'
                                    >
                                        <option selected>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>
                                    </select>
                                </div>
                            </div>
                            <div className='mt-3 flex items-center justify-between'>
                                <p className='mx-1 text-lg tracking-wide'>
                                    {Number(tickets)} * 5 ={"  "}
                                    <span className='border-[1px] border-neutral badge-ghost p-2 rounded-lg'>
                                        $ {Number(tickets) * 5}
                                    </span>
                                </p>
                                <button
                                    onClick={handleClick}
                                    type='button'
                                    className='btn btn-outline btn-success'
                                >
                                    Confirm
                                </button>
                            </div>
                        </form>
                    </dialog>
                </div>
            </div>
        </div>
    );
};

export default Booking;
