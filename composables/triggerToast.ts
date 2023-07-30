import type { Ref } from 'vue'

interface funcArgs {
  type: string;
  title: string;
  msg: string;
  showToast: Ref<boolean>;
  toastType: Ref<string>;
  toastTitle: Ref<string>;
  toastMsg: Ref<string>;
}

export default function({
  type, title, msg,
  showToast, toastType, toastTitle, toastMsg
}: funcArgs) {

  try {
    // Clear all timeouts
    var id = window.setTimeout(function() { }, 0);
    while (id--) {
      window.clearTimeout(id); // will do nothing if no timeout with id is present
    }
  } catch (err) {
    console.error(err)
  }

  showToast.value = false
  setTimeout(() => { showToast.value = true }, 20);
  toastType.value = type
  toastTitle.value = title
  toastMsg.value = msg
  setTimeout(() => { showToast.value = false }, 3000);
}

