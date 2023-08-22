import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocation, useNavigate } from '@builder.io/qwik-city';
import axios from "axios";

interface Task {
    id: number;
    body: string;
};

export default component$(() => {

    const nav = useNavigate()
  const error = useSignal<undefined>(undefined);
  const loading = useSignal<boolean>(true);
  const loc = useLocation();

  const body = useSignal<string>("")

  const success = useSignal<boolean>(false);
  const errorEdit = useSignal<undefined>(undefined);
  const loadingEdit = useSignal<boolean>(false);

    useVisibleTask$(async () => {
        try {
            const response = await axios.get<Task>(`http://127.0.0.1:3000/api/get/solo/item/${loc.params.itemId}/`);
            body.value = response.data.body
        } catch (err: any) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    })

  const postData$ = $(async () => {
    loading.value = true
    try {

      await axios.put(`http://127.0.0.1:3000/api/update/items/${loc.params.itemId}/`, {
        body: body.value
      });

        success.value = true
        await nav('/')

    } catch (err: any) {
          error.value = err.message
    } finally {
        loading.value = false
    }
  })

  return (
  <div>
      {loading.value && <p>Loading...</p>}
      {error.value && <p>Error: {error.value}</p>}
      {loadingEdit.value && <p>Loading put request</p>}
      {errorEdit.value && <p>Error: {error.value}</p>}
      <input name="body" bind:value={body} placeholder="body"/>
    <button
        preventdefault:click
      onClick$={() => {
        postData$()
      }}
    >
    Edit
    </button>
  </div>
  )
});
 

export const head: DocumentHead = {
  title: "Solo Task",
  meta: [
    {
      name: "una tarea maria",
      content: "solo tarea",
    },
  ],
};
