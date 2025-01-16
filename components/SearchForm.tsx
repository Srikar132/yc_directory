import Form from "next/form";
import SearchFormRest from "@/components/SearchFormRest";
import {Search} from "lucide-react";
import { Button } from "./ui/button";

const SearchForm = ({query} : {query? : string}) => {

    return (
        <Form action={"/"} scroll={false}
            className={`search-form`}
        >
            <input
                name="query"
                defaultValue={query}
                className={"search-input"}
                placeholder="Search Startups"
            />
            <div className={`flex gap-2`}>
                {query && <SearchFormRest/>}
                <Button type={"submit"} className={"search-btn text-white"}>
                    <Search className={"size-5"}/>
                </Button>
            </div>
        </Form>
    );
};

export default SearchForm;