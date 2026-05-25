insert into storage.buckets (id, name, public) values ('bolo-modelos', 'bolo-modelos', true);

create policy "Public read bolo-modelos"
on storage.objects for select
using (bucket_id = 'bolo-modelos');

create policy "Public upload bolo-modelos"
on storage.objects for insert
with check (bucket_id = 'bolo-modelos');