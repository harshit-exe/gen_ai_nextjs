"use client";
import { generateRecipies, getdata } from "@/actions/getrecipes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";

const Home = () => {
  const [state, action, ispending] = useActionState(generateRecipies, {
    recipe: {
      name: "",
      ingredients: [{ name: "", amount: "" }],
      items: [""],
    },
  });

  

  return (
    <main className="mx-36 p-10">

      <div className="p-5 w-96">
        <h1 className="text-2xl my-5 font-semibold">🍉 AI Recipe Generation</h1>
        <form action={action} className="flex gap-5">
          <Input name="goal" className="w-96" />
          <Button disabled={ispending}>Submit</Button>
        </form>
      </div>
      {ispending && <h1>...Loading</h1>}
      <div className="my-10 space-y-5">
        <h2 className="text-xl font-semibold">{state.name}</h2>
        <h1 className="text-lg font-medium">Ingredients : </h1>
        <div className="flex gap-2 w-fit flex-wrap">
          {state.ingredients?.map((item, index) => {
            return (
              <div key={index} className="p-2 rounded-lg bg-orange-100">
                <Label className="text-base flex-col text-nowrap flex">
                  {item.name}
                  <p className="text-orange-400 text-sm">{item.amount}</p>
                </Label>
              </div>
            );
          })}
        </div>
        <h1 className="text-lg font-medium">How to Make it : </h1>
        <div className="flex flex-col p-5 bg-slate-100 rounded-lg gap-3">
          {state.items}
        </div>
      </div>

    </main>
  );
};

export default Home;
