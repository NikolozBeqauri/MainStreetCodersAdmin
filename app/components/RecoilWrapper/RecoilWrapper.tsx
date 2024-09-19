'use client'
import { ReactNode } from "react"
import { RecoilRoot} from "recoil"


export const RecoilWrapper = (props: { children: ReactNode }) => {

    return (
        <RecoilRoot>
            {props.children}
        </RecoilRoot>
    )
}