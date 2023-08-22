import { useSignal, component$, $} from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import axios from "axios";

export default component$(() => {

    const nav = useNavigate()
    const success = useSignal<boolean>(false);
    const error = useSignal<undefined>(undefined);
    const loading = useSignal<boolean>(false);

    const body = useSignal<string>('')


    const postData$ = $( async () => {
        loading.value = true
        try {

        await axios.post('http://127.0.0.1:3000/api/create/items/', {
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
    <>
      {loading.value && <p>Loading...</p>}
      {error.value && <p>error{error}</p>}
      <input name="body" bind:value={body} placeholder="body"/>
    <button
      onClick$={() => {
        postData$()
      }}
    >
    Add 
    </button>
    </>
    )

});


