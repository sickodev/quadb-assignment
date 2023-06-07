"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
    setTitle,
    setRating,
    setRuntime,
    setSummary,
    setImage,
    setGenres,
} from "@/features/movie/movieSlice";

const MainContent = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [mounted, setMounted] = useState<boolean>();
    const [showInfos, setShowInfos] = useState([]);
    const router = useRouter();

    const dispatch = useDispatch();

    const handleClick = (showInfo: any) => {
        dispatch(setTitle(showInfo.show.name));
        dispatch(setSummary(showInfo.show.summary));
        dispatch(setRating(getRating(showInfo)));
        dispatch(setRuntime(showInfo.show.runtime));
        dispatch(setImage(showInfo.show.image.medium));
        dispatch(setGenres(showInfo.show.genres[0]));

        router.push("/booking");
    };

    const getRating = (showInfo: any) => {
        const rating =
            showInfo?.show.rating.average === null
                ? (showInfo.score * 10).toFixed(1)
                : (showInfo?.show.rating.average).toFixed(1);
        return rating;
    };

    const getData = async () => {
        try {
            const data = await axios.get(
                "https://api.tvmaze.com/search/shows?q=all"
            );
            setShowInfos(data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            return error;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setMounted(true);
        getData();
    }, [mounted]);
    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1'>
                    {showInfos.map((showInfo: any, id) => (
                        // Card component using daisyUI
                        <div key={id} className='py-2'>
                            <div className='card lg:card-side !rounded-none bg-base-100 shadow-xl m-1 border-[1px] border-warning'>
                                <div className='h-48 w-full relative rounded-t-lg'>
                                    <Image
                                        src={showInfo.show.image.medium}
                                        alt=''
                                        fill
                                        priority
                                        className='object-cover md:my-1.5 md:mx-1'
                                    />
                                </div>
                                <div className='card-body'>
                                    <h2 className='card-title text-xl md:text-2xl'>
                                        {showInfo?.show?.name}
                                    </h2>
                                    <div className='flex items-center justify-between space-x-5'>
                                        <p className='badge badge-accent badge-outline'>
                                            {showInfo.show.genres[0]}
                                        </p>{" "}
                                        <div className='flex flex-grow items-center justify-center gap-2 p-1'>
                                            <StarIcon className='h-5 w-5 text-warning' />
                                            <p className='text-lg'>
                                                {showInfo?.show.rating
                                                    .average === null
                                                    ? (
                                                          showInfo.score * 10
                                                      ).toFixed(1)
                                                    : (showInfo?.show.rating.average).toFixed(
                                                          1
                                                      )}
                                            </p>
                                        </div>
                                        <p className='font-light badge badge-outline badge-info'>
                                            {showInfo.show.language
                                                .substring(0, 2)
                                                .toUpperCase()}
                                        </p>
                                    </div>
                                    <div>
                                        <p></p>
                                    </div>
                                    <div className='card-actions justify-center'>
                                        <button
                                            onClick={() =>
                                                handleClick(showInfo)
                                            }
                                            className='btn btn-warning flex-grow'
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MainContent;
