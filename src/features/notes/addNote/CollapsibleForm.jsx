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
import useHandleClickOutside from "@/features/notes/useHandleClickOutside";
import { capitalize } from "@/features/notes/utils";
import { ref, set, push } from "firebase/database";
import { db } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function CollapsibleForm({ fetchNotes, username, notesArray }) {
  const largeForm = useForm({ defaultValues: { title: "", note: "" } });
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
          className={`${
            notesArray.length === 0
              ? "absolute top-[calc(0.9rem+1vw)] left-[50%] translate-x-[-50%]"
              : ""
          } space-y-4 w-[20rem] mx-auto mt-4`}
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
