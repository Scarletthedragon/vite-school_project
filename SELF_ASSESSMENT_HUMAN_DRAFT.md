# Pašvērtējums

## 1. Ievads

Mans projekta temats ir izglītojoša spēļu platforma Dragons Den. Ideja radās, jo gribēju apvienot mācīšanos ar spēles elementiem, lai lietotājam būtu interesanti ne tikai izpildīt uzdevumus, bet arī redzēt savu progresu.

Projekta mērķis bija izveidot pilnvērtīgu tīmekļa risinājumu ar datubāzi, kurā lietotājs var reģistrēties, pieteikties, pildīt uzdevumus, krāt punktus un redzēt rezultātus, savukārt administrators var pārvaldīt lietotājus un saturu.

Īsumā: es gribēju uztaisīt sistēmu, kas ir ne tikai tehniski korekta, bet arī lietotājam saprotama un motivējoša.

## 2. Darba process un izaicinājumi

Projektu veidoju secīgi pa posmiem.

1. Sākumā definēju prasības un sapratu, kādas funkcijas ir obligātas.
2. Tad izstrādāju datu modeļus (UML un ER), lai man būtu skaidra sistēmas loģika.
3. Pēc tam izveidoju backend daļu ar API endpointiem un datu validāciju.
4. Paralēli izstrādāju frontend lapas un savienoju tās ar backend.
5. Beigās testēju plūsmas, labošanas un dokumentāciju.

Lielākās grūtības bija:

- noturēt konsekventu lomu loģiku starp frontend un backend;
- pareizi strukturēt datubāzes modeli tā, lai tas būtu gan praktisks, gan atbilstošs prasībām;
- uzturēt dokumentāciju tikpat detalizētu kā pašu kodu.

Šīs problēmas risināju ar kontrolsarakstiem, pakāpenisku testēšanu un salīdzināšanu pret vērtēšanas kritērijiem. Ja redzēju, ka kādā sadaļā pietrūkst konkrētības, uzreiz papildināju ar tabulu, piemēru vai diagrammu.

Mans lielākais izaicinājums bija sabalansēt “darbojas tehniski” un “izskatās kvalitatīvi dokumentācijā”. To pārvarēju, sadalot darbu mazākos soļos un katru sadaļu pabeidzot līdz galam, nevis atstājot “uz vēlāk”.

## 3. Rezultāti un sasniegumi

Ar ko esmu visvairāk apmierināts:

- ka izdevās savienot pilnu plūsmu no reģistrācijas līdz rezultātu uzskaitei;
- ka ir lomu sadalījums (visitor, user, admin) ar atšķirīgām darbībām;
- ka dokumentācija ir strukturēta un piesaistīta vērtēšanas kritērijiem.

Labāk par sākotnējo plānu izdevās datu modeļu skaidrojums un dokumentācijas detalizācija. Sākumā plānoju īsāk, bet beigās izveidoju daudz pilnīgāku aprakstu ar tabulām, relācijām un skaidrojumiem.

Galvenie ieguvumi no projekta:

- praktiska pieredze full-stack izstrādē;
- padziļināta izpratne par autentifikāciju un autorizāciju;
- labāka izpratne par datu modelēšanu un normalizāciju;
- prasme rakstīt strukturētu tehnisko dokumentāciju.

## 4. Secinājumi un nākotnes plāni

Uzskatu, ka projekta mērķis ir sasniegts, jo izveidoju strādājošu sistēmu ar galvenajām prasītajām funkcijām un skaidru datu plūsmu.

Svarīgākās lietas, ko iemācījos:

- domāt par drošību un validāciju jau izstrādes laikā, nevis beigās;
- veidot sistēmu no modeļa uz realizāciju, nevis otrādi;
- dokumentāciju rakstīt paralēli darbam, nevis tikai noslēgumā.

Ja man būtu vairāk laika, es noteikti:

- ieviestu tokenu autentifikāciju (piemēram, Sanctum);
- pilnībā normalizētu punktu vēstures tabulas;
- pievienotu vairāk automatizētu testu un vizuālus testu pierādījumus.

Nākotnē šo projektu var paplašināt kā mācību platformu ar skolotāja paneli, progresa analītiku un personalizētiem uzdevumiem.

Vai izvēlētos šo tēmu arī kvalifikācijas darbam? Jā, jo tā ir praktiska un dod iespēju parādīt gan programmēšanas, gan analīzes, gan dokumentēšanas prasmes.

## 5. Pašrefleksija un argumentācija

Šis projekts man palīdzēja saprast, ka kvalitatīvs risinājums nav tikai kods, bet arī pamatoti lēmumi.

Piemērs 1:

- Apgalvojums: lomu sistēma bija kritiski svarīga.
- Kāpēc: bez tās nebūtu iespējams korekti atdalīt admin funkcijas no parasta lietotāja darbībām.
- Pierādījums: admin var piešķirt punktus un dzēst lietotājus, bet user to nevar.
- Ko iemācījos: piekļuves kontrole jāplāno jau arhitektūras līmenī.

Piemērs 2:

- Apgalvojums: datu modeļa kvalitāte tieši ietekmē sistēmas stabilitāti.
- Kāpēc: nekonsekvents modelis rada kļūdas API un lietotāja interfeisā.
- Pierādījums: pēc relāciju un lauku precizēšanas kļuva vienkāršāk validēt datus un testēt funkcijas.
- Ko iemācījos: laba modelēšana samazina problēmas visos nākamajos posmos.

---

## Ātra pielāgošana pirms iesniegšanas

Pirms iesniegšanas ieteicams nomainīt:

- "esmu apmierināts" teikumus uz precīzi saviem iespaidiem;
- konkrēto izaicinājumu piemērus ar saviem reālajiem gadījumiem;
- nākotnes plānus uz to, ko tieši tu gribētu darīt tālāk.
