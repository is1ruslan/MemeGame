const situationsList = [
    'Когда сказал бате, что ты гетеросексуал, батя:',
    'Когда сказал ей, что ты как животное в постели, но не уточнил, что как кролик',
    'Когда встречаешься с порноактрисой и слушаешь как прошел ее рабочий день',
    'Когда от скуки скачиваешь тиндер и видишь там свою девушку, у которой в описании написано, что она девственница',
    'Когда он сказал, что этот фильм ассоциируется с тобой и включил порно',
    'Когда смотришь порно, чтобы убедиться, что секс не изменился с тех пор, как ты занимался им в последний раз',
    'Отчим, который отправляет несколько дикпиков за день, я, который пользуюсь телефоном мамы:',
    'Когда посмотрел "Секс в большом городе", но секс так и не увидел',
    'Когда врач спрашивает "сколько пальцев", а ты на проверке простаты',
    'Когда вернулся домой пьяный и пытаешься пройти ровно мимо комнаты родителей',
    'Когда с другом/подругой решили завязать пить и встретились на следующий день в алкомаркете',
    'Когда бухой друг докопался до толпы и говорит, что его кенты сейчас всех порвут',
    'Когда она сказала, что родители уехали на дачу',
    'Когда работаешь из дома и случайно выпил с утра 12 бутылок пива',
    'Когда привел домой девушку, а батя почему-то покраснел',
    'Когда заплатила за курс по горловому минету 15 тысяч, а он до горла даже не достал',
    'Когда она лесбиянка, а ты ведешь себя как баба',
    'Когда мама спросила, почему я все время смотрю на обои рабочего стола во время того, как она заходит',
    'Когда понял, что в универ нужно ходить, чтобы учитьсяЮ а не покурить с пацанами и поесть в столовой',
    'Когда она познакомила тебя со своими подругами и ты понял, что тебе досталась самая страшненькая',
    'Лицо ФСБшника, когда ты заклеил камеру ноутбука',
    'Когда увидел себя в списках на отчисление, но следующим в списке идет твой лучший друг',
    'Когда твоя девушка спит с другим, но ты ей ничего не говоришь, потому что это ее муж',
    'Когда устроился на лесопилку и теперь каждый день видишь бывшую',
    'Когда взяла линейку брата, а на ней отметка 7 см',
    'Когда на утро после пьянки ешь окрошку, а потом говорят, что окрошку никто не готовил',
    'Когда мама начала материться на кота, а ты отвечаешь на экзамене в зуме',
    'Когда у нее 3-ий размер с учетом надбавок, пуш-апа и НДС',
    'Когда родители говорят "никакого секса до свадьбы", но ты есть на их свадебных фотографиях',
    'Когда она родила от тебя ребенка на 5-ом месяце отношений',
    'Когда начальник прислал тебе дикпик и ты пытаешься понять: по ошибке или с намеком',
    'Когда она сказала, что не против попробовать втроем и приводит своего фитнес-тренера',
    'Когда случайно отправил девушке/парню домашку, а своему преподу нюдсы',
    'Когда в фильме затухает кадр и ты видишь в отражении свое тупое хлебало',
    'Когда в детстве идешь ночью с каменным лицом, чтобы бабайка офигел от того, что тебе на него наплевать',
    'Когда купил машину или недвижку до повышения цен',
    'Когда сказали прийти в костюме и ты пришел в спортивном',
    'Когда подобрал пароль от вайфая соседа',
    'Когда купил акций МакДональдс на 10 рублей',
    'Когда полгода ставишь ей огонечки в сторис, а она выкладывает фото с новым парнем',
    'Когда родственники просят рассказать чем ты занимаешься',
    'Когда бросаешь курить уже 20 минут',
    'Когда гуглишь свои симптомы и начинаешь думать, что скоро умрешь',
    'Когда на соседний столик еду принесли быстрее, хотя ты пришел и заказал раньше',
    'Тот самый чел, который всего добился сам, родившись в богатой семье',
    'Когда она попросила хотя бы 1 день вести себя прилично, а ты уже надел костюм динозавра',
    'Когда бабушка скидывает поздравления с Днем Яблочного Спаса',
    'Когда пытаешься договориться с тараканами в своей голове',
    'Когда друг без отношений даёт тебе советы по отношениям',
    'Когда заходишь в комнату и понимаешь, что ты не вовремя',
    'Когда звонят в дверь, а ты делаешь вид, что дома никого нет', 
    'Реакция на "сюрприз" от коллеги, который принес на работу очень странное блюдо на общий обед', 
    'Когда ты открываешь подарок и пытаешься убедительно притвориться, что он тебе нравится',
    'Когда ты говоришь шутку, и только твой лучший друг её понимает',
    'Когда учился 6 лет на врача, а в итоге стал кальянщиком',
    'Когда показываешь другу мем, над которым орал 10 минут, а он говорит: "Видел"',
    'Когда она сказала: "Дорогой, моя мама приедет на выходные"',
    'Когда ищешь новых друзей, потому что старые еще помнят твои выходки в прошлую пятницу',
    'Когда набрал 10 лишних килограмм для своей роли, но неожиданно вспомнил, что ты не актер',
    'Когда у самолета отказал один двигатель, но стюардеса говорит: "Без паники, у самолета 2 двигателя"',
    'Когда прилег на 15 минут и проснулся спустя 4 часа и не знаешь какой сейчас год',
    'Когда весь офис перевели с удаленки обратно, а тебя нет и удалили из рабочего чата',
    'Как я себя чувствую, когда сижу на видеоконференции в рубашке, галстке и трусах',
    'Мое лицо, когда меня просят встать в кадр:',
    'Когда друзья увидели у тебя пачку жвачки',
    'Когда посмотрел боевик и ищешь кому вломить',
    'Когда батя подписался на твой ТикТок',
    'Кем был бы физрук по его словамЮ если бы не перелом мизинца на левой ноге в 1983:',
    'Когда притворился больным, чтобы не идти в школу, но мама запрещает заниматься чем-то веселым',
    'Когда родители пообещали купить тебе айфон 30 февраля',
    'Когда в школе перед каникулами сказали "отдыхайте дети" и задали прочитать 300 книг',
    'Когда всем в наследство достались квартиры и машины, а тебе только беды с башкой',
    'Когда хотещь выложить историю и вспоминаешь всех родственников, от которых хочешь ее скрыть',
    'Когда твой ТикТок набрал 236 просмотров и ты бросаешь работу ради блогерства',
    'Твое лицо, когда отправляешь смеющиеся смайлики',
    'Когда спрашивают пригодилось ли тебе высшее образование',
    'Когда выпил миндальное молоко вместо обычного и ощущаешься себя очень здоровым',
    'Когда подарил ей айфон в кредит, вы расстались, а ты до сих пор за него платишь',
    'Когда летишь на самолете на высоте 10 тыс. метров и видишь свою самооценку',
    'Когда спустился в пещеру на 200 метров и видишь свою самооценку',
    'Когда тебя ругают и перечисляют твои выходки, а ты пытаешься не заржать',
    'Когда подростки обращаются к тебе на "вы"',
    'Когда пошел лечить зуб, но удалил его, так как вылечить стоит 10000, а удалить 2000',
    'Когда кто-то спросил "Ты же не собираешься все это съесть?", тем временем я:',
    'Когда урок уже закончился и отличница напоминает про домашнее задание',
    'Когда мама сказала, что вы поедете гулять, а вы приехали в Ашан',
    'Когда друзья звонят в домофон и спрашивают "Ты дома?"',
    'Когда друг позвонил ночью и спрашивает "Спишь?"',
    'Когда убрался в комнате, а мама начинает искать что я натворил',
    'Когда мама позвала кушать супчик, а ты скащал пацанам в игре, что ты пошел покурить',
    'Когда сел смотреть фильм, но уже 5 минут смотришь рекламу ставок и казино',
    'Когда используешь нож, чтобы сэкономить патроны, все остальные игроки в пейнтбол:',
    'Когда очередной таксист рассказывает тебе о своем успешном бизнесе',
    'Когда присутсвуешь при ссоре двух близнецов и один из них называет другого уродом',
    'Когда фильм на Кинопоиске стоит 600 рублей, а ты нашел на Одноклассниках бесплатно в 360р',
    'Когда твой друг сказал, что знает короткую дорогу, и вы идете дольше обычного через кусты и болота',
    'Когда перед сном экстренно пытаешься составить успешный бизнес план, чтобы не идти завтра на работу',
    'Когда работаешь в службе поддержки и уже советовал включить и выключить, но это не помогло',
    'Когда мама запрещает гулять после 23, но тебе еще 22',
    'Когда удалось ничего не потратить за день и ты думаешь, что прожил его бесплатно',
    'Банкомат: положите деньги пачкой в купюроприемник. \nЯ, который ПАЧКОЙ деньги в жизни в руках не держал:',
    'Когда думаешь, что на карте осталось 300 рублей, а осталось 374 и ты чувствуешь себя не таким нищим',
    'Шеф: Вы опоздали. \nЯ: А вы задержали мне зарплату. \nШеф: Но зарплату же вы получили. \nЯ: Так и я на работу все-таки пришел. \nШеф:',
    'Когда постирал паспорт',
    'Это я посреди спора понимаю, что я не прав',
    'Когда ты уже взрослый но до сих пор реагируешь на киндер сюрприз так:',
    'Это я не понимаю как я должен бороться со своими внутренними демонами, когда сам тот еще чёрт',
    'Я: Приятно познакомиться, я душнила этой компании. \nНовый знакомый: Может, душа? \nЯ:',
    'Бесились с собакой и ты ее укусил. \nСобака:',
    'Когда тренер похвалил при всех на тренировке',
    'Когда она говорит, что твоя зарплата - это ваши деньги, а её зарплата - её деньги',
    'Когда вспоминаешь что-то смешное в неподходящий момент и пытаешься сдержать смех',
    'Когда вспомнил смешную шутку, стоя на похоронах и пытаешься сдержать смех',
    'Когда говоришь "пока" и идешь в том же направлении',
    'Когда пытаешься объяснить смысл мема, и это звучит абсурдно вслух',
    'Когда пытаешься вспомнить имя кого-то, кого только что встретил, и называешь его "эээ... дружище"',
    'Когда пытаешься заснуть, и в голове начинает играть самая надоедливая песня',
    'Когда друг 1999 года рождения жалуется на тяжелую жизнь 90-х',
    'Когда выиграл 6 миллионов рублей от государства и тебе нужно всего лишь отправить 1000 рублей на номер для получения денег',
    'Когда рассказал историю другу, от которого ты эту историю услышал',
    'Когда твоим соседям так сильно нравится твоя музыка, что они кинули камень в твое окно, чтобы лучше ее слышать',
    'Когда списываешь на контрольной и встречаешься взглядом с учителем',
    'Когда тебе стало душно и ты решил открыть дверь, тем временем все в самолете:',
    'Когда мяукнул коту и он мяукнул в ответ',
    'Когда закончил фразу словами "Но это уже совсем другая история"',
    'Это я когда отказалась от 1 импульсивной покупки и в награду совершила 3 другие',
    'Сайт: *запрещает скачивать фотографии* \nЯ: *делаю скриншот фотографии* \nСайт:',
    'Когда тебя только что обокрали в Китае и полиция спрашивает на кого были похожи грабители',
    'Это я иду штурмовать холодильник в 3 часа ночи',
    'Когда входишь в комнату и сразу забываешь, зачем туда пришел',
    'Когда видишь цену на свою любимую еду в аэропорту',
    'Когда твоя собака смотрит на тебя, пока ты ешь',
    'Когда в детстве говоришь, что никогда не станешь как твои родители, а потом ловишь себя на их фразах',
    'Когда пытаешься сфотографировать себя с хорошей стороны, но камера открывается на фронтальную',
    'Когда ты уже 5 минут на диете и кто-то приносит пиццу',
    'Когда подруга спрашивает, как ей идет новая стрижка, а она ей не идет',
    'Когда забыл пароль, который только что придумал',
    'Когда возвращаешься в спортзал после долгого перерыва',
    'Когда ты вспоминаешь неловкий момент из прошлого прямо перед сном',
    'Когда смотрел сериал целую ночь и понимаешь, что сейчас нужно идти на работу',
    'Когда пытаешься уснуть, а мозг начинает анализировать все ошибки жизни',
    'Когда твой кот смотрит на тебя с высока, когда ты убираешь его лоток',
    'Когда решил вести здоровый образ жизни, но в холодильнике только пицца и кола',
    'Когда весь день работал из дома и понял, что ни разу не вставал с кресла',
    'Когда твой друг рассказывает ту же историю в третий раз',
    'Когда забыл имя человека, с которым познакомился секунду назад',
    'Когда пытаешься прочитать инструкцию на иностранном языке',
    'Когда кто-то рядом плохо поет и ты сдерживаешься изо всех сил',
    'Когда кто-то говорит шутку, а ты не понял, но смеешься чтобы не показаться тупым',
    'Когда кто-то спрашивает твое мнение о политике на семейном ужине',
    'Когда слышишь свой любимый трек в магазине и пытаешься не танцевать',
    'Когда пытаешься открыть упаковку, а она открывается слишком легко и все вылетает',
    'Когда пытаешься найти ключи, которые оказываются в руке',
    'Когда кто-то спрашивает твое мнение о сериале, который ты не смотрел',
    'Когда впервые пытаешься сделать что-то по рецепту и все идет не по плану',
    'Когда говоришь "да" на вопрос, который ты не услышал',
    'Когда слышишь свое имя в чужом разговоре',
    'Когда ты пытаешься вспомнить слово, и оно на языке',
    'Когда кто-то спрашивает твое мнение, а ты не слушал разговор',
    'Когда видишь своего учителя вне школы',
    'Когда кто-то говорит тебе спасибо, а ты отвечаешь "да"',
    'Когда кто-то говорит комплимент, а ты не знаешь, как реагировать',
    'Когда забыл выключить будильник на выходных',
    'Когда видишь, как кто-то делает что-то неловко, а неловко становится тебе',
    'Когда пытаешься понять, как работает новое приложение',
    'Когда пытаешься сделать серьезное лицо во время серьезного разговора',
    'Когда забыл, что хотел сказать, когда пришел твой черед говорить',
    'Когда ты первый раз в новом месте и пытаешься не выглядеть потерянным',
    'Когда кто-то спрашивает твое мнение, и ты соглашаешься, не зная о чем речь',
    'Когда кто-то рассказывает шутку, и ты ее не понимаешь',
    'Когда не можешь вспомнить, где оставил свою машину на парковке',
    'Когда кто-то спрашивает, как прошел твой день, а ты только проснулся',
    'Когда пытаешься найти вещь, которая оказывается прямо перед тобой',
    'Когда пытаешься вспомнить, где ты видел этого человека раньше',
    'Когда слышишь свою любимую песню в чужой машине',
    'Когда пытаешься прочитать что-то без очков',
    'Когда ты возвращаешься за забытыми вещами, а потом забываешь, что хотел взять',
    'Когда встречаешь одноклассника, и оба делаете вид, что не узнали друг друга',
    'Когда в чате все молчат, а ты отправляешь мем и тоже молчишь, чтобы не казаться навязчивым',
    'Когда открываешь холодильник в поисках еды, но находишь только продукты, которые требуют приготовления',
    'Когда ищешь в Google ответы на вопросы жизни в 3 часа ночи',
    'Когда пытаешься влезть старые джинсы',
    'Когда съел всю еду, а фильм еще даже не начался',
    'Когда собираешься на тренировку, но в итоге проводишь весь день лежа на диване',
    'Когда весь день настраивашься, чтобы куда-то позвонить',
    'Когда пытаешься объяснить мемы родителям',
    'Когда приходишь на встречу первым и пытаешься не выглядеть одиноким',
    'Когда пытаешься понять, почему вещь не работает, а потом понимаешь, что она не включена',
    'Когда пытаешься притвориться, что понимаешь шутку на иностранном языке',
    'Когда кто-то врет, а ты знаешь правду и слушаешь что этот умник напридумывал',
    'Когда пытаешься найти свой телефон, пока разговариваешь по нему',
    'Когда слышишь свой голос на записи и он тебе не нравится',
    'Когда тебя ловят за рассматриванием себя в зеркале',
    'Когда пытаешься петь в душе, и вода вдруг становится холодной',
    'Когда пытаешься пройти мимо кого-то, и вы начинаете танец "кто куда пойдет"',
    'Когда твой компьютер начинает обновление прямо перед срочной работой',
    'Когда видишь, как кто-то делает странные упражнения в тренажерном зале',
    'Когда ты говоришь комплимент, но это звучит как сарказм',
    'Когда ты находишь давно потерянную вещь в самом очевидном месте',
    'Когда ты пытаешься изобразить из себя эксперта в разговоре, но быстро забегаешь в тупик',
    'Когда ты пытаешься понять инструкцию на иностранном языке, используя только иллюстрации',
]

module.exports = situationsList