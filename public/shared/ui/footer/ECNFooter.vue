<template>
  <div class="bg-gray-100">
    <div class="max-w-desktop grow mx-auto py-10">
      <div class="flex justify-between">
        <div>
          <div class="text-xl font-bold mb-5">Продажа</div>

          <div class="flex flex-col space-y-3">
            <ECNFooterLink to="/404" label="Квартиры в новостройках" />

            <ECNFooterLink to="/404" label="Квартиры – вторичное жилье" />

            <ECNFooterLink to="/404" label="Комнаты" />

            <ECNFooterLink to="/404" label="Земельные участки" />

            <ECNFooterLink to="/404" label="Дома, дачи, коттеджи" />

            <ECNFooterLink to="/404" label="Коммерческая недвижимость" />

            <ECNFooterLink to="/404" label="Гараж" />
          </div>
        </div>

        <div>
          <div class="text-xl font-bold mb-5">Аренда</div>

          <div class="flex flex-col space-y-3">
            <ECNFooterLink to="/404" label="Квартиры – вторичное жилье" />

            <ECNFooterLink to="/404" label="Комнаты" />

            <ECNFooterLink to="/404" label="Земельные участки" />

            <ECNFooterLink to="/404" label="Дома, дачи, коттеджи" />

            <ECNFooterLink to="/404" label="Коммерческая недвижимость" />
          </div>
        </div>

        <div>
          <div class="text-xl font-bold mb-5">О ЕЦН</div>

          <div class="flex flex-col space-y-3">
            <ECNFooterLink to="/about" label="О компании" />

            <ECNFooterLink to="/about/staff" label="Сотрудники" />

            <ECNFooterLink to="/vacancies" label="Вакансии" />

            <ECNFooterLink to="/404" label="Отзывы" />

            <ECNFooterLink to="/stories" label="Новости" />
          </div>
        </div>

        <div>
          <div class="text-xl font-bold mb-5">Контакты</div>

          <div class="flex flex-col space-y-3">
            <ECNFooterLink to="/404" label="Тюмень, ул.Володарского, д.17/4" />

            <ECNFooterLink to="/404" label="Тюмень, ул.Кирова, д.43" />

            <ECNFooterLink to="/404" label="+7 (3452) 606-694" />
          </div>

          <div class="mt-5 flex flex-col space-y-1 text-xs">
            <div>Пн-пт с 9.00 до 21.00</div>

            <div>Пн-пт с 10.00 до 18.00</div>
          </div>
        </div>

        <div>
          <div class="text-xl font-bold mb-5">Подписаться</div>

          <div class="flex space-x-1">
            <input
              class="px-3 py-2 bg-white rounded-md border-gray-200 overflow-hidden text-xs w-full grow placeholder-gray-400 ring- ring-2 ring-gray-200 outline-none"
              type="email"
              inputmode="email"
              placeholder="Укажите E-mail"
            />

            <div class="bg-blue-600 rounded cursor-pointer p-2 shrink-0">
              <i-common-footer-subscribe-arrow class="w-4 h-4 text-white" />
            </div>
          </div>

          <div class="mt-5 flex items-center space-x-4">
            <a href="#"><i-common-footer-icon-tiktok class="h-6" /></a>

            <a href="#"><i-common-footer-icon-vk class="h-6" /></a>

            <a href="#"><i-common-footer-icon-yt class="h-6" /></a>
          </div>
        </div>
      </div>

      <div class="h-px bg-gray-300 my-10" />

      <div class="flex items-center justify-between">
        <i-common-header-logo
          filled
          :font-controlled="false"
          class="w-[92px]"
        />

        <div class="text-2xs text-gray-400">
          © 2015-2024 Единый центр недвижимости
        </div>

        <div class="text-2xs text-gray-400 max-w-[540px]">
          Сайт носит исключительно информационный характер и ни при каких
          условиях не является публичной офертой, определяемой положениями
          пункта 2 статьи 437 Гражданского кодекса Российской Федерации.
          Использование сайта означает согласие с Пользовательским соглашением и
          Политикой в отношении обработки персональных данных клиентов. Правила
          агентирования и Положение ГБС
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
