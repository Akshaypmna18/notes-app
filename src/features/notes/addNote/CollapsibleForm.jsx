import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import useHandleClickOutside from "@/features/notes/addNote/useHandleClickOutside";
import { capitalize } from "@/features/notes/functions";
import { ref, set, push } from "firebase/database";
import { db } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function CollapsibleForm({ fetchNotes, username }) {
  const largeForm = useForm({ defaultValues: {} });
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false);

  const formRef = useRef();
  const handleClickOutside = () => {
    setIsCollapsibleOpen(false);
    largeForm.setValue("title", "");
    largeForm.setValue("note", "");
  };
  useHandleClickOutside(formRef, handleClickOutside);

  const addNote = ({ title, note }) => {
    const userNotesRef = ref(db, `/notes/${username}/`);
    const newNoteRef = push(userNotesRef);
    set(newNoteRef, {
      title: capitalize(title) || "",
      note: capitalize(note),
    });
    fetchNotes();
    largeForm.setValue("title", "");
    largeForm.setValue("note", "");
    setIsCollapsibleOpen(false);
  };

  return (
    <Collapsible
      onOpenChange={() => setIsCollapsibleOpen(!isCollapsibleOpen)}
      open={isCollapsibleOpen}
    >
      <Form {...largeForm}>
        <form
          onSubmit={largeForm.handleSubmit(addNote)}
          className="space-y-4 w-[20rem] mx-auto"
          ref={formRef}
        >
          <FormField
            control={largeForm.control}
            name="title"
            rules={{
              maxLength: {
                value: 25,
                message: "Title length should not exceed 25 characters",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CollapsibleTrigger
                    onClick={(e) => {
                      if (isCollapsibleOpen) e.preventDefault();
                    }}
                  >
                    <Input
                      placeholder={
                        isCollapsibleOpen ? "Add title here..." : "Add new note"
                      }
                      {...field}
                      className="w-[20rem]"
                    />
                  </CollapsibleTrigger>
                </FormControl>
                <FormMessage className={isCollapsibleOpen ? "" : "hidden"} />
              </FormItem>
            )}
          />
          <CollapsibleContent>
            <FormField
              control={largeForm.control}
              name="note"
              rules={{
                required: {
                  value: true,
                  message: "Note field cannot be empty",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Add note here..."
                      {...field}
                      className="w-[20rem]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full mt-4">
              Add note
            </Button>
          </CollapsibleContent>
        </form>
      </Form>
    </Collapsible>
  );
}

export default CollapsibleForm;
