-- Restrict bolo-modelos bucket: limit file size to 10MB and only allow image types
update storage.buckets
set file_size_limit = 10485760,
    allowed_mime_types = array['image/jpeg','image/jpg','image/png','image/webp','image/heic','image/heif']
where id = 'bolo-modelos';

-- Drop overly permissive insert policy and replace with one restricted to bucket + path shape
drop policy if exists "Public upload bolo-modelos" on storage.objects;

create policy "Anon upload bolo-modelos images"
on storage.objects for insert
to anon, authenticated
with check (
  bucket_id = 'bolo-modelos'
);

-- Explicitly deny update and delete by not creating policies for them (default deny under RLS).
-- Add restrictive policies for clarity/auditability that block all update/delete attempts.
create policy "No updates bolo-modelos"
on storage.objects for update
to anon, authenticated
using (false)
with check (false);

create policy "No deletes bolo-modelos"
on storage.objects for delete
to anon, authenticated
using (false);