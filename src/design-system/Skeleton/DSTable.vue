<template>
  <div class="q-pa-md">
    <q-markup-table>
      <thead>
        <tr>
          <th
            class="text-left"
            style="width: 100%"
            colspan="5"
          >
            <q-skeleton
              animation="blink"
              type="text"
              width="200px"
            />
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="n in 3"
          :key="n"
        >
          <td class="text-left">
            <q-skeleton
              animation="blink"
              type="text"
              width="50px"
            />
          </td>

          <td class="text-right">
            <q-skeleton
              animation="blink"
              type="text"
              width="200px"
            />
          </td>

          <td class="text-right">
            <q-skeleton
              animation="blink"
              type="text"
              width="150px"
            />
          </td>

          <td class="text-right">
            <q-skeleton
              animation="blink"
              type="text"
              width="65px"
            />
          </td>

          <td class="text-right">
            <q-skeleton
              animation="blink"
              type="text"
              width="125px"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script lang="ts" setup />
