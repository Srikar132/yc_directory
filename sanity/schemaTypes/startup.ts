import { defineField, defineType } from "sanity";

export const startup = defineType({
    title : "Startups",
    name : "startup",
    type : "document",
    fields : [
        defineField({
            name : "title",
            type : "string"
        }),
        defineField({
            name : "slug",
            type : "slug",
            options : {
                source : "title"
            }
        }),
        defineField({
            name : "image",
            type : "url"
        }),
        defineField({
            name : "views",
            type : "number"
        }),
        defineField({
            name : "description",
            type : "text"
        }),
        defineField({
            name : "author",
            type : "reference",
            to : { type : "author" } 
        }),
        defineField({
            name : "category",
            type : "string",
            validation : (Rule) => Rule.min(1).max(20).required().error("Please enter a category")
        }),
        defineField({
            name : "pitch",
            type : "markdown"
        })
    ]
})