<template>
  <div class="m-10 flex flex-col gap-10 items-center">
    <form action="#" class="flex flex-col gap-10">
      <div class="flex items-center gap-10">
        <h3 class="w-28 font-semibold text-gray-900 dark:text-white">Class name</h3>
        <div class="relative">
          <input type="text" id="class-name" class="w-96 flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Class name"/>
        </div>
      </div>
      <div class="flex items-center gap-10">
        <h3 class="w-28 font-semibold text-gray-900 dark:text-white">Class mode</h3>
        <ul class="items-center w-fit text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li class="w-28 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div class="flex items-center pl-3">
              <input id="one-time-class" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
              <label for="one-time-class" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">One-time</label>
            </div>
          </li>
          <li class="w-28 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div class="flex items-center pl-3">
              <input id="repeat-class" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
              <label for="repeat-class" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Repeat</label>
            </div>
          </li>
        </ul>
        <div class="flex items-center gap-3">
          <div class="">Every</div>
          <input type="number" min="1" max="31" placeholder="" class="w-24 border border-gray-300 p-2 my-2 rounded-md focus:outline-none focus:ring-2 ring-blue-200" />
          <div class="">day(s)</div>
        </div>
      </div>
      <div class="flex gap-10">
        <h3 class="w-28 font-semibold text-gray-900 dark:text-white">Date</h3>
        <div class="max-w-sm w-full shadow-lg">
          <div class="md:p-8 p-5 dark:bg-gray-800 bg-white rounded-t">
            <div class="px-4 flex items-center justify-between">
              <span tabindex="0" class="focus:outline-none text-base font-bold dark:text-gray-100 text-gray-800">October 2020</span>
              <div class="flex items-center">
                <button aria-label="calendar backward" class="focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="15 6 9 12 15 18" />
                </svg>
              </button>
              <button aria-label="calendar forward" class="focus:text-gray-400 hover:text-gray-400 ml-3 text-gray-800 dark:text-gray-100"> 
                 <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="9 6 15 12 9 18" />
                </svg>
              </button>

              </div>
            </div>
            <div class="flex items-center justify-between pt-12 overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr>
                    <th>
                      <div class="w-full flex justify-center">
                        <p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">Mo</p>
                      </div>
                    </th>
                    <th>
                      <div class="w-full flex justify-center">
                        <p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">Tu</p>
                      </div>
                    </th>
                    <th>
                      <div class="w-full flex justify-center">
                        <p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">We</p>
                      </div>
                    </th>
                    <th>
                      <div class="w-full flex justify-center">
                        <p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">Th</p>
                      </div>
                    </th>
                    <th>
                      <div class="w-full flex justify-center">
                        <p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">Fr</p>
                      </div>
                    </th>
                    <th>
                      <div class="w-full flex justify-center">
                        <p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">Sa</p>
                      </div>
                    </th>
                    <th>
                      <div class="w-full flex justify-center">
                        <p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">Su</p>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="pt-6">
                      <div class="px-2 py-2 cursor-pointer flex w-full justify-center"></div>
                    </td>
                    <td class="pt-6">
                      <div class="px-2 py-2 cursor-pointer flex w-full justify-center"></div>
                    </td>
                    <td>
                      <div class="px-2 py-2 cursor-pointer flex w-full justify-center"></div>
                    </td>
                    <td class="pt-6">
                      <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                        <p class="text-base text-gray-500 dark:text-gray-100 font-medium">1</p>
                      </div>
                    </td>
                    <td class="pt-6">
                      <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                        <p class="text-base text-gray-500 dark:text-gray-100 font-medium">2</p>
                      </div>
                    </td>
                    <td class="pt-6">
                      <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                        <p class="text-base text-gray-500 dark:text-gray-100">3</p>
                      </div>
                    </td>
                    <td class="pt-6">
                      <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                        <p class="text-base text-gray-500 dark:text-gray-100">4</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                        <p class="text-base text-gray-500 dark:text-gray-100 font-medium">5</p>
                      </div>
                    </td>
                    <td>
                      <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                        <p class="text-base text-gray-500 dark:text-gray-100 font-medium">6</p>
                      </div>
                    </td>
                    <td>
                      <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                        <p class="text-base text-gray-500 dark:text-gray-100 font-medium">7</p>
                      </div>
                    </td>
                    <td>
                      <div class="w-full h-full">
                        <div class="flex items-center justify-center w-full rounded-full cursor-pointer">
                          <a role="link" tabindex="0" class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:bg-indigo-500 hover:bg-indigo-500 text-base w-8 h-8 flex items-center justify-center font-medium text-white bg-indigo-700 rounded-full">8</a>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                        <p class="text-base text-gray-500 dark:text-gray-100 font-medium">9</p>
                      </div>
                    </td>
                    <td>
                      <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                        <p class="text-base text-gray-500 dark:text-gray-100">10</p>
                      </div>
                    </td>
                    <td>
                      <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                        <p class="text-base text-gray-500 dark:text-gray-100">11</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                        <p class="text-base text-gray-500 dark:text-gray-100 font-medium">12</p>
                      </div>
                    </td>
                    <td>
                      <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                        <p class="text-base text-gray-500 dark:text-gray-100 font-medium">13</p>
                      </div>
                    </td>
                    <td>
                      <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                        <p class="text-base text-gray-500 dark:text-gray-100 font-medium">14</p>
                      </div>
                    </td>
                    <td>
                      <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                        <p class="text-base text-gray-500 dark:text-gray-100 font-medium">15</p>
                      </div>
                    </td>
                    <td>
                      <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                        <p class="text-base text-gray-500 dark:text-gray-100 font-medium">16</p>
                      </div>
                    </td>
                    <td>
                      <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                        <p class="text-base text-gray-500 dark:text-gray-100">17</p>
                      </div>
                    </td>
                    <td>
                      <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                        <p class="text-base text-gray-500 dark:text-gray-100">18</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                        <p class="text-base text-gray-500 dark:text-gray-100 font-medium">19</p>
                      </div>
                    </td>
                    <td>
                      <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                        <p class="text-base text-gray-500 dark:text-gray-100 font-medium">20</p>
                      </div>
                    </td>
                    <td>
                      <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                        <p class="text-base text-gray-500 dark:text-gray-100 font-medium">21</p>
                      </div>
                    </td>
                    <td>
                      <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                        <p class="text-base text-gray-500 dark:text-gray-100 font-medium">22</p>
                      </div>
                    </td>
                    <td>
                      <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                        <p class="text-base text-gray-500 dark:text-gray-100 font-medium">23</p>
                      </div>
                    </td>
                    <td>
                      <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                        <p class="text-base text-gray-500 dark:text-gray-100">24</p>
                      </div>
                    </td>
                    <td>
                      <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                        <p class="text-base text-gray-500 dark:text-gray-100">25</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                        <p class="text-base text-gray-500 dark:text-gray-100 font-medium">26</p>
                      </div>
                    </td>
                    <td>
                      <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                        <p class="text-base text-gray-500 dark:text-gray-100 font-medium">27</p>
                      </div>
                    </td>
                    <td>
                      <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                        <p class="text-base text-gray-500 dark:text-gray-100 font-medium">28</p>
                      </div>
                    </td>
                    <td>
                      <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                        <p class="text-base text-gray-500 dark:text-gray-100 font-medium">29</p>
                      </div>
                    </td>
                    <td>
                      <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
                        <p class="text-base text-gray-500 dark:text-gray-100 font-medium">30</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-10">
        <h3 class="w-28 font-semibold text-gray-900 dark:text-white">Time</h3>
        <div class="flex items-center gap-6">
          <h4 class="flex justify-center item-center font-semibold text-gray-900 dark:text-white">From</h4>
          <div class="p-5 w-40 bg-white rounded-lg shadow-xl">
            <div class="flex">
              <select name="hours" class="bg-transparent text-xl appearance-none outline-none">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">10</option>
                <option value="12">12</option>
              </select>
              <span class="text-xl mr-3">:</span>
              <select name="minutes" class="bg-transparent text-xl appearance-none outline-none mr-4">
                <option value="0">00</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
              </select>
              <select name="ampm" class="bg-transparent text-xl appearance-none outline-none">
                <option value="am">AM</option>
                <option value="pm">PM</option>
              </select>
            </div>
          </div>
          <h4 class="flex justify-center item-center font-semibold text-gray-900 dark:text-white">To</h4>
          <div class="p-5 w-40 bg-white rounded-lg shadow-xl">
            <div class="flex">
              <select name="hours" class="bg-transparent text-xl appearance-none outline-none">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">10</option>
                <option value="12">12</option>
              </select>
              <span class="text-xl mr-3">:</span>
              <select name="minutes" class="bg-transparent text-xl appearance-none outline-none mr-4">
                <option value="0">00</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
              </select>
              <select name="ampm" class="bg-transparent text-xl appearance-none outline-none">
                <option value="am">AM</option>
                <option value="pm">PM</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
