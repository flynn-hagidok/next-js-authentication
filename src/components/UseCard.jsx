"use client";

import { useSession } from "next-auth/react";

const UseCard = () => {

    // const { data: session } = useSession();
    const session = useSession();
    console.log(session);

    return (
        <div>
            <h2 className="font-bold text-xl">Use Client</h2>
            {/* <div className="border-2 rounded p-4">{session?.user?.name}</div> */}
            <div className="border-2 rounded p-4">{JSON.stringify(session)}</div>
        </div>
    );
};

export default UseCard;