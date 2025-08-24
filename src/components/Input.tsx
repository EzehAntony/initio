"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z.object( {
    link: z.string().min( 5, {
        message: "link must be at least 5 characters.",
    } ),
} );

export function InputForm () {
    const form = useForm<z.infer<typeof FormSchema>>( {
        resolver: zodResolver( FormSchema ),
        defaultValues: {
            link: "",
        },
    } );

    function onSubmit ( data: z.infer<typeof FormSchema> ) {
        toast( "You submitted the following values", {
            description: (
                <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
                    <code className="text-white">{ JSON.stringify( data, null, 5 ) }</code>
                </pre>
            ),
        } );
    }

    return (
        <Form { ...form }>
            <form onSubmit={ form.handleSubmit( onSubmit ) } className="w-full space-y-6">
                <FormField
                    control={ form.control }
                    name="link"
                    render={ ( { field } ) => (
                        <FormItem>
                            <FormLabel className="text-white">Link</FormLabel>
                            <FormControl>
                                <Input className="text-white my-5 max-w-[600px]" placeholder="Enter URL" { ...field } />
                            </FormControl>
                            <FormDescription>
                                This is the link of the video you want to download
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    ) }
                />
                <Button type="submit" variant={ "secondary" }>Submit</Button>
            </form>
        </Form>
    );
}
