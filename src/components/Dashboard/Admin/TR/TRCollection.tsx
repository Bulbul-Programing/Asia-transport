"use client"
import InputFieldError from "@/components/Shared/InputFieldError"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useActionState, useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { X } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import { updateCollection } from "@/service/Dashboard/TR/TRManagement"

const TRCollection = () => {
    const TRRef = useRef<HTMLFormElement>(null)
    const updateCollectionFormRef = useRef<HTMLFormElement>(null)
    const [state, formAction, isPending] = useActionState(updateCollection, null)
    const [paidTRIds, setPaidTRIds] = useState<number[]>([])

    useEffect(() => {
        if (!state) return
        if (state.success) {
            toast.success(state.message ?? "Collection updated!")
            setTimeout(() => {
                setPaidTRIds([])
            }, 0)
        } else {
            toast.error(state.message ?? "Something went wrong!")
        }
    }, [state])

    const handleAddTR = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!TRRef.current) return

        const data = new FormData(TRRef.current)
        const trid = Number(data.get("trid"))

        if (!trid) {
            toast.error("Please enter a valid TR ID")
            return
        }
        if (paidTRIds.includes(trid)) {
            toast.warning("This TR ID is already added")
            return
        }

        setPaidTRIds((prev) => [...prev, trid])
        TRRef.current.reset()
    }

    const handleRemoveTR = (trid: number) => {
        setPaidTRIds((prev) => prev.filter((id) => id !== trid))
    }

    const updateTRPaymentStatus = () => {
        if (paidTRIds.length === 0) {
            toast.error("Add at least one TR first")
            return
        }

        // ✅ Set the hidden input value imperatively BEFORE submitting
        const hiddenInput = updateCollectionFormRef.current?.elements.namedItem(
            "collectionTR"
        ) as HTMLInputElement | null

        if (hiddenInput) {
            hiddenInput.value = JSON.stringify(paidTRIds)
        }

        updateCollectionFormRef.current?.requestSubmit()
    }
    return (
        <div>
            <Dialog >
                <DialogTrigger asChild>
                    <Button variant="default">Add Collection</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Enter Your TR ID For Daily Collection</DialogTitle>
                    </DialogHeader>

                    {/* TR ID Tags */}
                    <div className="flex gap-2 flex-wrap max-h-40 overflow-y-auto">
                        {paidTRIds.map((trid) => (
                            <div
                                key={trid}
                                className="flex items-center gap-x-2 border px-2 py-1 rounded-sm border-blue-200 bg-blue-50"
                            >
                                <span className="text-sm">{trid}</span>
                                <Button
                                    size="xs"
                                    variant="ghost"
                                    className="hover:cursor-pointer p-0 h-auto"
                                    onClick={() => handleRemoveTR(trid)}
                                    type="button" // ✅ prevent accidental form submit
                                >
                                    <X size={14} />
                                </Button>
                            </div>
                        ))}
                    </div>

                    <Separator />

                    {/* Add TR form */}
                    <FieldGroup>
                        <form ref={TRRef} onSubmit={handleAddTR}>
                            <FieldLabel htmlFor="trid">TR ID</FieldLabel>
                            <div className="flex gap-x-3 mt-2">
                                <Field className="flex-3">
                                    <Input
                                        id="trid"
                                        name="trid"
                                        type="number"
                                        placeholder="1234"
                                    />
                                    <InputFieldError field="trid" state={state} />
                                </Field>
                                <Field className="flex-1">
                                    <Button type="submit">Add</Button>
                                </Field>
                            </div>
                        </form>
                    </FieldGroup>

                    {/* ✅ Hidden submit form — value is set imperatively before requestSubmit() */}
                    <form ref={updateCollectionFormRef} action={formAction} className="hidden">
                        <input type="hidden" name="collectionTR" defaultValue="" />
                    </form>

                    <div className="flex gap-x-3 justify-end">
                        <DialogClose asChild>
                            <Button onClick={() => setPaidTRIds([])} type="button" variant={"destructive"} className="cursor-pointer">Close</Button>
                        </DialogClose>
                        <Button
                            type="button"
                            onClick={updateTRPaymentStatus}
                            disabled={isPending || paidTRIds.length === 0}
                        >
                            {isPending
                                ? "Updating..."
                                : `Submit${paidTRIds.length > 0 ? ` (${paidTRIds.length})` : ""}`}
                        </Button>
                    </div>


                </DialogContent>
            </Dialog>
        </div>
    )
}

export default TRCollection