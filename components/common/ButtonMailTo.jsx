'use client'
import React from "react";
import { Button } from "./Button";

const ButtonMailTo = ({ mailto }) => {
    return (
        <a
            href={mailto}
        >
            <Button>
                Contact Landlord
            </Button>
        </a>
    );
};

export default ButtonMailTo;